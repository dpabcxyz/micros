<template>
  <RouterView />
  <div class="nav">
      <RouterLink to="/child1">子应用1-/</RouterLink>
      <RouterLink to="/child1/test1">子应用1-test</RouterLink>
      <RouterLink to="/child1">子应用2-/</RouterLink>
      <RouterLink to="/child2/test1">子应用2-test</RouterLink>
  </div>
  <div id="child1App"></div>
  <div id="child2App"></div>
</template>
