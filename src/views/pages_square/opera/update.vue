<template>
  <div class="opera">
    <template v-if="scrollList.length">
      <div v-for="item in scrollList" :key="item.id">
        <playItem
          class="opera_component"
          :cover="item.tvImage"
          :title="item.tvName"
          @click.native="router.push(`/pages_square/screening/screening`)"
        />
      </div>
    </template>
    <template v-else>
      <div class="no-data">暂无数据</div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { showFailToast } from 'vant';

const router = useRouter();

const scrollList = ref([
  { id: 1, image: "@/static/pageImages/play01.png", title: "狂飙" },
  { id: 2, image: "@/static/pageImages/play02.png", title: "杀破狼" },
  { id: 3, image: "@/static/pageImages/play03.png", title: "妖狐小红娘" },
  { id: 4, image: "@/static/pageImages/play04.png", title: "你是我的荣耀" },
  { id: 5, image: "@/static/pageImages/play05.png", title: "司藤" },
  { id: 6, image: "@/static/pageImages/play06.png", title: "梦华录" },
  { id: 7, image: "@/static/pageImages/play01.png", title: "狂飙" },
  { id: 8, image: "@/static/pageImages/play02.png", title: "杀破狼" },
  { id: 9, image: "@/static/pageImages/play03.png", title: "妖狐小红娘" },
  { id: 10, image: "@/static/pageImages/play04.png", title: "你是我的荣耀" },
  { id: 11, image: "@/static/pageImages/play05.png", title: "司藤" },
  { id: 12, image: "@/static/pageImages/play06.png", title: "梦华录" },
  { id: 13, image: "@/static/pageImages/play01.png", title: "狂飙" },
  { id: 14, image: "@/static/pageImages/play02.png", title: "杀破狼" },
  { id: 15, image: "@/static/pageImages/play03.png", title: "妖狐小红娘" },
  { id: 16, image: "@/static/pageImages/play04.png", title: "你是我的荣耀" },
  { id: 17, image: "@/static/pageImages/play05.png", title: "司藤" },
  { id: 18, image: "@/static/pageImages/play06.png", title: "梦华录" },
]);

onMounted(() => {
  getMustData();
});

// 获取必看数据
async function getMustData() {
  // const { code, message, result } = await this.$http('/tvRecommend');
  // if(code !== 200) return showFailToast(message);
  // scrollList.value = result || [];

}
</script>

<style lang="scss" scoped>
.opera {
  padding: 0 0.53rem;
  padding-top: 0.53rem;
  display: flex;
  flex-wrap: wrap;
  .opera_component {
    margin: 0 0.32rem 0.53rem 0;
    &:nth-child(3n + 3) {
      margin-right: 0;
    }
  }
}
</style>
