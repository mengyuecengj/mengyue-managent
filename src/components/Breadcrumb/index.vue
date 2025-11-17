<template>
    <MYBreadcrumb separator="/" class="breadcrumb">
        <template v-for="item in $route.matched" :key="item.path">
            <MYBreadcrumb-item v-if="item.meta.title" class="breadcrumb-item">{{ item.meta.title
            }}</MYBreadcrumb-item>
        </template>
    </MYBreadcrumb>
</template>
<style scoped lang="scss">
.breadcrumb {
    display: flex;
    align-items: center;
    padding-top: 13px;
    font-size: 16px;
    color: var(--navbar-hamburger);
}

:deep(.my-breadcrumb-link) {
    color: var(--navbar-text);
    margin: 0 4px;
}

:deep(.my-breadcrumb-separator) {
    color: var(--navbar-text);
    margin: 0 4px;
}

:deep(.breadcrumb-item:last-child) .my-breadcrumb-separator {
    display: none;
}
</style>