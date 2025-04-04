<template>
  <div v-if="text" class="info">
    <div>{{ text }}</div>
    <button class="close" @click="close">&times;</button>
  </div>
</template>

<script setup>

defineProps({
  text: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['closeAlert']);

const close = () => {
  emit('closeAlert');
};
</script>

<style scoped>
button{
  background: none;
  border: none;
  color: white;
}
.info {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #2196F3; /* Blue color */
  color: white;
  padding: 15px 25px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  font-weight: 500;
  max-width: 350px;
  transition: transform 0.3s ease-in-out;
}

.info:hover {
  transform: scale(1.05);
}

.close {
  cursor: pointer;
  font-size: 22px;
  margin-left: 15px;
  font-weight: bold;
  transition: color 0.3s;
}

.close:hover {
  color: #FF4081; /* Pink color when hovered */
}
</style>
