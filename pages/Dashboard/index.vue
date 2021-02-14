<template>
  <div>
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from '~/pages/Dashboard/dashboard'
export default {
  name: 'Home',
  components: { Dashboard },
  layout: 'dashboard',
  middleware: ['Admin']
}
</script>
