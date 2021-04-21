<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-card v-if="master">
            <template v-slot:header class="clearfix">
              <h1>
                {{ master.firstName }} {{ master.secondName }}
                {{ master.lastName }}
              </h1>
            </template>
            <el-row>
              <el-col :span="8">
                <img
                  :src="master.photo"
                  class="image"
                />
              </el-col>
              <el-col :span="16">
                <el-rate
                  v-model="master.rating"
                  disabled
                  text-color="#ff9900"
                  show-score
                  score-template="{value}"
                />
              </el-col>
            </el-row>
          </el-card>
          <el-divider />
          <h3>Reviews:</h3>
          <el-card v-for="comment in reviews" :key="comment.id" style="margin-bottom: 10px;">
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
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Comment } from '../models/Comment';
import { defineComponent, ref } from 'vue'
import { Master } from '../models/Master';
import { getMaster } from '../services/master-service';
import { getMasterComments } from '../services/comment-service';
import { formatDateTime } from '../services/format-service';

export default defineComponent({
  name: 'MasterPage',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const reviews = ref<Comment[]>([]);
    const master = ref<Master>();
    const loadMaster = async () => {
      master.value = await getMaster(props.id);
    };
    const loadReviews = async () => {
      reviews.value = await getMasterComments(props.id);
      console.log(reviews.value);
    };
    return { master, reviews, loadMaster, loadReviews };
  },
  mounted () {
    this.loadMaster();
    this.loadReviews();
  },
  methods: {
    commentTime (time: Date): string {
      return formatDateTime(time);
    }
  }
})
</script>
