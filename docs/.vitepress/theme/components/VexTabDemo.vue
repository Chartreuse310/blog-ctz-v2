<template>
  <div class="vextab-demo">
    <div class="vextab-demo__render" ref="renderRef"></div>
    <div class="vextab-demo__source">
      <div class="vextab-demo__source-header">
        <span>VexTab 源码</span>
        <button @click="copyCode" class="vextab-demo__copy-btn">
          {{ copied ? '已复制' : '复制' }}
        </button>
      </div>
      <pre><code class="language-vextab">{{ sourceCode }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps<{
  code?: string
  codeBase64?: string
  scale?: number
}>()

const renderRef = ref<HTMLDivElement | null>(null)
const copied = ref(false)
const sourceCode = ref('')
let resizeObserver: ResizeObserver | null = null

const decodeBase64 = (str: string): string => {
  if (typeof window !== 'undefined') {
    return decodeURIComponent(escape(window.atob(str)))
  }
  return Buffer.from(str, 'base64').toString('utf-8')
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(sourceCode.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (e) {
    console.error('Failed to copy:', e)
  }
}

const renderVexTab = async () => {
  if (!renderRef.value || typeof window === 'undefined' || !sourceCode.value) return

  try {
    const { VexTab, Artist, Vex } = await import('vextab')
    const Renderer = Vex.Flow.Renderer

    renderRef.value.innerHTML = ''

    const scale = props.scale || 1.0
    const width = renderRef.value.clientWidth || 600
    const artist = new Artist(10, 10, width / scale, { scale })
    const tab = new VexTab(artist)

    tab.parse(sourceCode.value)
    const renderer = new Renderer(renderRef.value, Renderer.Backends.SVG)
    const height = (artist.last_y + artist.options.bottom_spacing) * scale
    renderer.resize(width, height)
    artist.render(renderer)
  } catch (e) {
    console.error('VexTab parse error:', e)
    if (renderRef.value) {
      renderRef.value.innerHTML = `<div class="vextab-error">渲染错误: ${e}</div>`
    }
  }
}

onMounted(() => {
  if (props.code) {
    sourceCode.value = props.code
  } else if (props.codeBase64) {
    sourceCode.value = decodeBase64(props.codeBase64)
  }

  if (sourceCode.value) {
    renderVexTab()
  }

  resizeObserver = new ResizeObserver(() => {
    if (sourceCode.value) {
      renderVexTab()
    }
  })
  if (renderRef.value) {
    resizeObserver.observe(renderRef.value)
  }
})

watch(() => props.code, (newCode) => {
  if (newCode) {
    sourceCode.value = newCode
    renderVexTab()
  }
})

watch(() => props.codeBase64, (newBase64) => {
  if (newBase64) {
    sourceCode.value = decodeBase64(newBase64)
    renderVexTab()
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<style scoped>
.vextab-demo {
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.vextab-demo__render {
  padding: 16px;
  background: var(--vp-c-bg);
  overflow-x: auto;
  display: flex;
  justify-content: center;
  min-height: 60px;
}

.vextab-demo__render svg {
  max-width: 100%;
  height: auto;
}

.vextab-demo__source {
  border-top: 1px solid var(--vp-c-divider);
}

.vextab-demo__source-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.vextab-demo__copy-btn {
  padding: 2px 8px;
  font-size: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.vextab-demo__copy-btn:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.vextab-demo__source pre {
  margin: 0;
  padding: 12px 16px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.6;
}

.vextab-error {
  color: #e74c3c;
  padding: 16px;
  font-family: monospace;
}
</style>
