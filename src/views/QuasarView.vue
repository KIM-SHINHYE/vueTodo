<template>
    <div class="row">
      <q-card v-for="c in 10" :key="c">
        <div class="text-center bg-primary text-white">멤버</div>
        <q-card-section>
          <div>홍길동</div>
          <div>디자인 팀</div>
          <div>010-0000-0000</div>
        </q-card-section>
      </q-card>
    </div>
  </template>
  