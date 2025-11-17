<template>
  <div class="header-search">
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click" />
    <MYDialog title="搜索" v-model="show" width="600px" height="420px" backgroundColor="var(--navbar-bg)" textColor="var(--navbar-text)"
      @close="close" :show-close="false" append-to-body>
      <MYInput 
        v-model="search"
        ref="headerSearchSelectRef"
        size="large"
        @input="querySearch"
        prefix-icon="Search"
        placeholder="菜单搜索，支持标题、URL模糊查询"
        placeholderColor="var(--navbar-text)"
        textColor="var(--navbar-text) !important"
        clearable 
        class="search-input"  
      />
      <div class="result-wrap">
        <MYScrollbar ScrollWidth="8px" trackColor="var(--track-color)">
          <div class="search-item" tabindex="1" v-for="item in options" :key="item.path">
            <div class="left">
              <svg-icon class="menu-icon" :icon-class="item.icon" />
            </div>
            <div class="search-info" @click="change(item)">
              <div class="menu-title">
                {{ item.title.join(" / ") }}
              </div>
              <div class="menu-path">
                {{ item.path }}
              </div>
            </div>
          </div>
        </MYScrollbar>
      </div>
    </MYDialog>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import type { FuseResult } from 'fuse.js'
import { getNormalPath } from '@/utils/general'
import { isHttp } from '@/utils/validate'
import usePermissionStore from '@/store/modules/permission'
import { Route, RouteItem } from '@/types/components/headerSearch'
// 引入拼音库
import { pinyin } from 'pinyin-pro'

const search = ref<string>('')
const options = ref<RouteItem[]>([])
const searchPool = ref<RouteItem[]>([])
const show = ref<boolean>(false)
const fuse = ref<Fuse<RouteItem> | undefined>(undefined)
// script setup 父组件
const headerSearchSelectRef = ref<any>(null)
const router = useRouter()
const routes = computed<Route[]>(() => usePermissionStore().defaultRoutes as Route[])

function click() {
  show.value = !show.value
  if (show.value) {
    headerSearchSelectRef.value && headerSearchSelectRef.value.focus()
    options.value = searchPool.value
  }
}

function close() {
  headerSearchSelectRef.value && headerSearchSelectRef.value.blur()
  search.value = ''
  options.value = []
  show.value = false
}

function change(val: RouteItem) {
  const path = val.path
  const query = val.query
  if (isHttp(path)) {
    const pindex = path.indexOf('http')
    window.open(path.substr(pindex, path.length), '_blank')
  } else {
    if (query) {
      router.push({ path, query: JSON.parse(query) })
    } else {
      router.push(path)
    }
  }

  search.value = ''
  options.value = []
  nextTick(() => {
    show.value = false
  })
}

function initFuse(list: RouteItem[]) {
  fuse.value = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: [
      { name: 'title', weight: 0.5 },
      { name: 'path', weight: 0.3 },
      { name: 'pinyinTitle', weight: 0.2 } // 添加拼音搜索权重
    ]
  })
}

// 修改 generateRoutes 函数，添加拼音支持
function generateRoutes(
  routes: Route[],
  basePath: string = '',
  prefixTitle: string[] = []
): RouteItem[] {
  let res: RouteItem[] = []

  for (const r of routes) {
    if (r.hidden) continue
    const p = r.path.length > 0 && r.path[0] === '/' ? r.path : '/' + r.path
    const data: RouteItem = {
      path: !isHttp(r.path) ? getNormalPath(basePath + p) : r.path,
      title: [...prefixTitle],
      icon: '',
      pinyinTitle: ''
    }

    if (r.meta && r.meta.title) {
      data.title = [...data.title, r.meta.title]
      data.icon = r.meta.icon || ''

      // 添加拼音字段
      data.pinyinTitle = pinyin(data.title.join(''), { toneType: 'none', type: 'array' }).join('')

      if (r.redirect !== 'noRedirect') {
        res.push(data)
      }
    }
    if (r.query) {
      data.query = r.query
    }

    if (r.children) {
      const tempRoutes = generateRoutes(r.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}

function querySearch(query: string) {
  if (query !== '') {
    if (fuse.value) {
      options.value = fuse.value.search(query).map((item: FuseResult<RouteItem>) => item.item)
    } else {
      console.error('Fuse is not initialized')
      options.value = searchPool.value
    }
  } else {
    options.value = searchPool.value
  }
}

onMounted(() => {
  searchPool.value = generateRoutes(routes.value)
})

watch(searchPool, (list) => {
  initFuse(list)
})
</script>

<style lang="scss" scoped>
.header-search {
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
}

.result-wrap {
  height: 280px;
  margin: 10px 0;

  .search-item {
    display: flex;
    height: 48px;

    .left {
      width: 60px;
      text-align: center;

      .menu-icon {
        color: var(--navbar-text);
        width: 18px;
        height: 18px;
        margin-top: 5px;
      }
    }

    .search-info {
      padding-left: 5px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .menu-title,
      .menu-path {
        height: 20px;
        color: var(--navbar-text);
      }

      .menu-path {
        color: #ccc;
        font-size: 10px;
      }
    }
  }

  .search-item:hover {
    cursor: pointer;
  }
}
</style>