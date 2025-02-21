<script setup lang="ts"></script>
<template>
  <div class="grid grid-cols-[100px_1fr_100px] max-w-screen-xl m-auto pt-5">
    <div></div>
    <div class="flex gap-2 justify-center">
      <h2 class="hover:text-primary transition hover:underline text-xl">Daily Reflection</h2>
    </div>
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar class="border-primary border">
            <AvatarImage src="/profile/1.png" />
            <AvatarFallback>LOL</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  </div>
</template>
