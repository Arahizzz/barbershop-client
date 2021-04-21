<template>
  <el-container v-if="booking">
    <el-header>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <h1>Booking № {{ id }}</h1>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <div>
            <i class="el-icon-scissors"></i> Procedure:
            {{ booking.procedure.name }}
          </div>
          <div><i class="el-icon-date"></i> Date: {{ procedureDate }}</div>
          <div>
            <i class="el-icon-user"></i> Master: {{ booking.master.firstName }}
            {{ booking.master.secondName }} {{ booking.master.lastName }}
          </div>
          <el-divider />
          <h3>Comment</h3>
          <template v-if="comment !== undefined">
            <el-card v-if="isComment(comment)">
              <template v-slot:header class="clearfix">
                <span>{{ commentTime(comment.commentTime) }}</span>
                <el-rate
                  v-model="comment.rating"
                  disabled
                  text-color="#ff9900"
                  show-score
                  score-template="{value}"
                />
              </template>
              <p>{{ comment.userComment }}</p>
            </el-card>
            <div v-else>
              <h3>Add comment</h3>
              <el-form ref="commentForm" :model="comment" :rules="rules">
                <el-form-item label="Your rating" prop="rating">
                  <el-rate
                    v-model="comment.rating"
                    text-color="#ff9900"
                    show-score
                    score-template="{value}"
                  />
                </el-form-item>
                <el-form-item label="Your review" prop="userComment">
                  <el-input type="textarea" v-model="comment.userComment" />
                </el-form-item>
                <el-button type="primary" @click="saveComment">Save</el-button>
              </el-form>
            </div>
          </template>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Booking } from '../models/Booking';
import { Comment, CommentForm } from '../models/Comment';
import { getBooking } from '../services/record-service';
import { getComment, addComment } from '../services/comment-service';
import { formatTime, formatDateTime } from '../services/format-service';

export default defineComponent({
  name: 'BookingView',
  props: {
    'id': {
      type: String,
      required: true
    }
  },
  setup (props) {
    const booking = ref<Booking>();
    const comment = ref<Comment | Partial<CommentForm>>();
    const loadBooking = async () => {
      booking.value = await getBooking(props.id);
    };
    const loadComment = async () => {
      comment.value = await getComment(props.id) ?? {};
      console.log(comment);
    }
    const rules = {
      userComment: [
        { requrired: true, message: 'Enter your comment' }
      ],
      rating: [
        { required: true, message: 'Enter your rating' }
      ]
    }
    return { booking, loadBooking, comment, loadComment, rules };
  },
  mounted () {
    this.loadBooking();
    this.loadComment();
  },
  computed: {
    procedureDate (): string {
      const booking = this.booking;
      if (!booking) return "";
      return `${booking.start.toDateString()} ${formatTime(booking.start)}-${formatTime(booking.finish)}`;
    }
  },
  methods: {
    commentTime (commentTime: Date): string {
      return formatDateTime(commentTime);
    },
    isComment (comment: Comment | Partial<CommentForm>): comment is Comment {
      return 'commentTime' in comment;
    },
    async saveComment () {
      (this.$refs['commentForm'] as HTMLFormElement).validate(async (valid: boolean) => {
        if (valid) {
          await addComment(this.id, this.comment as CommentForm);
          this.loadComment();
        }
      });
    }
  }
})
</script>
