<template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { logout } = useAuth()

// Logout and redirect
await logout()
router.push({ path: '/auth' })
</script>
