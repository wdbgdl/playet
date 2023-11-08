<template>
  <div class="sign_page">
    <div class="sign_in_btn_wrap">
      <p class="slogan">Super cool short drama, enjoy immediately</p>
      <div class="btn facebook_btn">
        <img class="img" src="@/assets/images/facebook.png" />
        <span>Facebook</span>
      </div>
      <div class="btn google_btn">
        <img class="img" src="@/assets/images/google.png" />
        <span>Google</span>
      </div>
    </div>
    <p class="privacy_policy">
      Continue to agree to the <a>User Agreement</a> and <a>Privacy Policy</a>
    </p>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.sign_page {
  padding: 30px;
  background: #101821;
  height: 100vh;
  .sign_in_btn_wrap {
    margin-top: 50vh;
  }
  .slogan {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 50px;
  }
  .btn {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    border-radius: 4px;
    margin-bottom: 20px;
    .img {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }
  }
  .facebook_btn {
    background-color: #3e79ff;
  }
  .google_btn {
    background-color: #5a647a;
  }
  .privacy_policy {
    font-size: 12px;
    color: #a9aeb9;
    margin-top: 50px;
    a {
      color: #fff;
    }
  }
}
</style>
