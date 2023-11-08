import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
    const loginData = ref({})
  
    function setUserInfo(newUserInfo) {
		if(!newUserInfo) return;
		loginData.value = newUserInfo;
	}

    return { loginData, setUserInfo }
  })