import * as BorderComponents from '@/components/dashboard/renderers/BorderRenderer.vue'
import TextRenderer from '@/components/dashboard/renderers/TextRenderer.vue'
import BarChartRenderer from '@/components/dashboard/renderers/BarChartRenderer.vue'
import MapChartRenderer from '@/components/dashboard/renderers/MapChartRenderer.vue'
import DecorateRenderer from '@/components/dashboard/renderers/DecorateRenderer.vue'

export function resolveComponentByType(block: { rendererType: any; content: string | number }) {
    switch (block.rendererType) {
        case 'chart':
            return BarChartRenderer

        case 'text':
            return TextRenderer

        case 'border':
            // 确保 content 是字符串类型后再访问
            if (typeof block.content === 'string') {
                return (BorderComponents as Record<string, any>)[block.content] || null
            }
            return null

        case 'map':
            return MapChartRenderer

        case 'decoration':
            return DecorateRenderer

        default:
            return null
    }
}
