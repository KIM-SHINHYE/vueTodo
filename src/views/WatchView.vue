<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
const subTitleAttr = {
    style: 'color: aqua;'
};
</script>

<template>
    <br>
    <main>
        <div>
            <div>
                <h1>1. Watch란?</h1>
                <h5 :="subTitleAttr"></h5>
            </div>
            <br>
            <div>
                <h1>2. 사용법</h1>
            </div>
            <br>
            <div>
                <h1>3. 주의사항</h1> 
            </div>
            <br>
            <div>
                <h1>4. BEAST에서의 사용</h1>
            </div>

        </div>
    </main>
</template>

<style scoped>
.vPreBox {
    border: 1px solid white;
}
</style>