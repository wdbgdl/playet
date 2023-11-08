<template>
  <div class="content">
    <router-view />
  </div>

  <div class="footer" v-show="showFooter">
    <nav>
      <!-- 首页 -->
      <router-link to="/home" class="home" exact-active-class="home_active">
        <i></i>
        <span>Home</span>
      </router-link>
      <!-- 剧场 -->
      <router-link
        to="/square"
        class="square"
        exact-active-class="square_active"
      >
        <i></i>
        <span>Explore</span>
      </router-link>

      <!-- 我的 -->
      <router-link to="/mine" class="mine" exact-active-class="mine_active">
        <i></i>
        <span>Profile</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, watchEffect } from "vue";
import _ from "lodash";

// 路由
let router = useRouter();
const showFooter = ref(true);

watchEffect(
  () =>
    (showFooter.value = _.includes(
      ["home", "index", "square", "mine"],
      router.currentRoute.value.name
    ))
);
</script>

<style scoped lang="scss">
.content {
  line-height: 1.5;
  height: 92vh;
}

.footer {
  width: 100%;
  height: 8vh;
  background: #141414;
  position: fixed;
  left: 0;
  display: flex;
  align-items: center;
  bottom: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.33);
}

.footer nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  display: flex;
  flex-direction: row;
  i {
    width: 24px;
    height: 24px;
    background-size: 100% 100%;
    display: inline-block;
    background-repeat: no-repeat;
  }
  .home {
    &_active {
      i {
        background-image: url("@/assets/tabBarImages/home_active.png") !important;
      }
    }
    i {
      background-image: url("@/assets/tabBarImages/home.png");
    }
  }
  .square {
    &_active {
      i {
        background-image: url("@/assets/tabBarImages/square_active.png") !important;
      }
    }
    i {
      background-image: url("@/assets/tabBarImages/square.png");
    }
  }

  .mine {
    &_active {
      i {
        background-image: url("@/assets/tabBarImages/mine_active.png") !important;
      }
    }
    i {
      background-image: url("@/assets/tabBarImages/mine.png");
    }
  }
}

.footer nav a.router-link-exact-active {
  color: rgb(51, 51, 51);
}

.footer nav a.router-link-exact-active:hover {
  background-color: transparent;
}

.footer nav a {
  display: inline-block;
  padding: 0 1rem;
  flex: 1;
  color: rgb(102, 102, 102);
  img {
    width: 24px;
    height: 24px;
  }
}

.footer nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .content {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  .logo {
    margin: 0 2rem 0 0;
  }

  .footer nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
