import { ApiDefinition } from "@/types/views/api";

export const apiCache = ref<ApiDefinition[]>([
  {
    key: 'cache-info',
    method: 'GET',
    url: '/dev-api/monitor/cache',
    description: '查询缓存详细信息',
    requiresAuth: true,
    response: {
      msg: "操作成功",
      code: 200,
      data: {
        commandStats: [
          { name: "set", value: "91" },
          { name: "keys", value: "2" },
          { name: "get", value: "349" },
          { name: "ping", value: "5" },
          { name: "del", value: "14" },
          { name: "info", value: "1" },
          { name: "setex", value: "28" },
          { name: "exists", value: "11" }
        ],
        info: {
          uptime_in_seconds: "31934",
          maxmemory_human: "0B",
          aof_last_cow_size: "0",
          master_replid2: "0000000000000000000000000000000000000000",
          mem_replication_backlog: "0",
          aof_rewrite_scheduled: "0",
          total_net_input_bytes: "97135",
          rss_overhead_ratio: "0.00",
          hz: "10",
          redis_build_id: "5627b8177c9289c",
          aof_last_bgrewrite_status: "ok",
          multiplexing_api: "WinSock_IOCP",
          client_recent_max_output_buffer: "0",
          allocator_resident: "557842432",
          mem_fragmentation_bytes: "0",
          repl_backlog_first_byte_offset: "0",
          redis_mode: "standalone",
          redis_git_dirty: "0",
          allocator_rss_bytes: "192937984",
          repl_backlog_histlen: "0",
          rss_overhead_bytes: "-557106528",
          total_system_memory: "0",
          loading: "0",
          evicted_keys: "0",
          cluster_enabled: "0",
          redis_version: "5.0.14.1",
          repl_backlog_active: "0",
          mem_aof_buffer: "0",
          allocator_frag_bytes: "364000984",
          instantaneous_ops_per_sec: "0",
          used_memory_human: "719.92K",
          role: "master",
          maxmemory: "0",
          used_memory_lua: "37888",
          rdb_current_bgsave_time_sec: "-1",
          used_memory_startup: "661392",
          lazyfree_pending_objects: "0",
          used_memory_dataset_perc: "32.80%",
          allocator_frag_ratio: "403.89",
          arch_bits: "64",
          mem_clients_normal: "49950",
          expired_time_cap_reached_count: "0",
          mem_fragmentation_ratio: "1.00",
          aof_last_rewrite_time_sec: "-1",
          master_replid: "1dc444ddf523b1b1b5fe026beedaea5f344c9cf0",
          aof_rewrite_in_progress: "0",
          config_file: "E:software\\redisRedis-x64-5.0.14.1\\redis.windows.conf",
          lru_clock: "3432034",
          maxmemory_policy: "noeviction",
          run_id: "5e724f450db15a1bb9d1920aa2a46aebf0aecf09",
          latest_fork_usec: "13879",
          total_commands_processed: "500",
          expired_keys: "9",
          used_memory: "737200",
          mem_clients_slaves: "0",
          keyspace_misses: "36",
          executable: "E:software\\redisRedis-x64-5.0.14.1\\redis-server.exe",
          db0: "keys=17,expires=1,avg_ttl=1690550",
          used_memory_peak_human: "738.70K",
          keyspace_hits: "324",
          rdb_last_cow_size: "0",
          used_memory_overhead: "712334",
          active_defrag_hits: "0",
          tcp_port: "6379",
          uptime_in_days: "0",
          used_memory_peak_perc: "97.46%",
          blocked_clients: "0",
          sync_partial_err: "0",
          used_memory_scripts_human: "0B",
          aof_current_rewrite_time_sec: "-1",
          aof_enabled: "0",
          master_repl_offset: "0",
          used_memory_dataset: "24866",
          used_cpu_user: "20.828125",
          rdb_last_bgsave_status: "ok",
          atomicvar_api: "pthread-mutex",
          allocator_rss_ratio: "1.53",
          client_recent_max_input_buffer: "2",
          aof_last_write_status: "ok",
          mem_allocator: "jemalloc-5.2.1-redis",
          used_memory_scripts: "0",
          used_memory_peak: "756432",
          process_id: "1156",
          used_cpu_sys: "7.296875",
          repl_backlog_size: "1048576",
          connected_slaves: "0",
          total_system_memory_human: "0B",
          sync_full: "0",
          connected_clients: "1",
          allocator_active: "364904448",
          total_net_output_bytes: "304452",
          pubsub_channels: "0",
          active_defrag_key_hits: "0",
          rdb_changes_since_last_save: "3",
          instantaneous_input_kbps: "0.04",
          configured_hz: "10",
          used_memory_rss_human: "718.66K",
          expired_stale_perc: "0.00",
          active_defrag_misses: "0",
          used_cpu_sys_children: "0.000000",
          number_of_cached_scripts: "0",
          sync_partial_ok: "0",
          used_memory_lua_human: "37.00K",
          rdb_last_save_time: "1748262378",
          pubsub_patterns: "0",
          slave_expires_tracked_keys: "0",
          redis_git_sha1: "ec77f72d",
          used_memory_rss: "735904",
          rdb_last_bgsave_time_sec: "0",
          os: "Windows  ",
          mem_not_counted_for_evict: "0",
          active_defrag_running: "0",
          rejected_connections: "0",
          active_defrag_key_misses: "0",
          allocator_allocated: "903464",
          instantaneous_output_kbps: "0.64",
          second_repl_offset: "-1",
          rdb_bgsave_in_progress: "0",
          used_cpu_user_children: "0.000000",
          total_connections_received: "5",
          migrate_cached_sockets: "0"
        },
        dbSize: 17
      }
    },
    codeExample: `// 查询缓存详细
export function getCache() {
    return request({
        url: '/monitor/cache',
        method: 'get',
    })
}`
  },
  {
    key: 'cache-names',
    method: 'GET',
    url: '/dev-api/monitor/cache/getNames',
    description: '查询缓存名称列表',
    requiresAuth: true,
    response: {
      code: 200,
      message: 'success',
      data: ['sys_config', 'sys_dict', 'user_permissions']
    },
    codeExample: `// 查询缓存名称列表
export function listCacheName() {
    return request({
        url: '/monitor/cache/getNames',
        method: 'get',
    })
}`
  },
  {
    key: 'cache-keys',
    method: 'GET',
    url: '/dev-api/monitor/cache/getKeys/:cacheName',
    description: '查询缓存键名列表',
    requiresAuth: true,
    request: {
      params: {
        cacheName: 'string'
      }
    },
    response: {
      code: 200,
      message: 'success',
      data: ['key1', 'key2', 'key3']
    },
    codeExample: `// 查询缓存键名列表
export function listCacheKey(cacheName: string) {
    return request({
        url: '/monitor/cache/getKeys/' + cacheName,
        method: 'get',
    })
}`
  },
  {
    key: 'cache-value',
    method: 'GET',
    url: '/dev-api/monitor/cache/get/:cacheName/:cacheKey',
    description: '查询缓存内容',
    requiresAuth: true,
    request: {
      params: {
        cacheName: 'string',
        cacheKey: 'string'
      }
    },
    response: {
      code: 200,
      message: 'success',
      data: {
        value: 'cached_data',
        ttl: 3600,
        type: 'string'
      }
    },
    codeExample: `// 查询缓存内容
export function getCacheKey(cacheName: string, cacheKey: string) {
    return request({
        url: '/monitor/cache/get/' + cacheName + '/' + cacheKey,
        method: 'get',
    })
}`
  },
  {
    key: 'clear-cache-name',
    method: 'DELETE',
    url: '/dev-api/monitor/cache/clearCacheName/:cacheName',
    description: '清理指定名称缓存',
    requiresAuth: true,
    request: {
      params: {
        cacheName: 'string'
      }
    },
    response: {
      code: 200,
      message: '清理成功',
      data: null
    },
    codeExample: `// 清理指定名称缓存
export function clearCacheName(cacheName: string) {
    return request({
        url: '/monitor/cache/clearCacheName/' + cacheName,
        method: 'delete',
    })
}`
  },
  {
    key: 'clear-cache-key',
    method: 'DELETE',
    url: '/dev-api/monitor/cache/clearCacheKey/:cacheKey',
    description: '清理指定缓存键名缓存',
    requiresAuth: true,
    request: {
      params: {
        cacheKey: 'string'
      }
    },
    response: {
      code: 200,
      message: '清理成功',
      data: null
    },
    codeExample: `// 清理指定缓存键名缓存
export function clearCacheKey(cacheKey: string) {
    return request({
        url: '/monitor/cache/clearCacheKey/' + cacheKey,
        method: 'delete'
    })
}`
  },
  {
    key: 'clear-cache-all',
    method: 'DELETE',
    url: '/dev-api/monitor/cache/clearCacheAll',
    description: '清理全部缓存',
    requiresAuth: true,
    response: {
      code: 200,
      message: '清理成功',
      data: null
    },
    codeExample: `// 清理全部缓存
export function clearCacheAll() {
    return request({
        url: '/monitor/cache/clearCacheAll',
        method: 'delete'
    })
}`
  }
])