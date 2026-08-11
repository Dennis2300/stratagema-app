<template>
  <article class="flex justify-center items-center h-[66vh]">
    <div class="flex bg-base-300 p-4 rounded-2xl gap-4">
      <figure class="relative w-64">
        <img
          class="w-full h-full object-cover object-center rounded-lg"
          src="https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/06/01/237301566/9f8546f2983f1c24c15c86861179b994_1774682577090935272.png?x-oss-process=image%2Fformat%2Cwebp"
          alt=""
        />
        <div class="absolute bg-black/33 top-0 left-0 w-full h-full"></div>
      </figure>
      <div class="w-xl flex flex-col justify-around">
        <h1 class="text-center">Login</h1>

        <form
          action=""
          class="flex flex-col justify-center items-center space-y-4"
        >
          <input type="text" placeholder="E-mail" class="input" />
          <input type="text" placeholder="Password" class="input" />
          <button class="btn btn-success">Login</button>
        </form>
      </div>
    </div>
  </article>
</template>
