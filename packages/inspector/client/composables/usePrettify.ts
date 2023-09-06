import prettier from 'prettier/standalone'
import parserCSS from 'prettier/parser-postcss'
import parserHTML from 'prettier/parser-html'
import parserBabel from 'prettier/parser-babel'
import { resolveUnref } from '@vueuse/core'
import { computed } from 'vue'
import type { MaybeRefOrGetter } from '@vueuse/core'

export function usePrettify(content: MaybeRefOrGetter<string | undefined>, toggle: MaybeRefOrGetter<boolean>, type: 'css' | 'babel' | 'html') {
  const plugins = {
    css: parserCSS,
    html: parserHTML,
    babel: parserBabel,
  }
  return computed(() => {
    if (!resolveUnref(toggle))
      return resolveUnref(content) || '/* empty */'

    try {
      return prettier.format(resolveUnref(content) || '', {
        parser: type,
        plugins: [plugins[type]],
        singleQuote: true,
        semi: false,
      })
    }
    catch (e: any) {
      console.error(e)
      return `/* Error on prettifying: ${e.message} */\n${resolveUnref(content) || ''}`
    }
  })
}

export function useCSSPrettify(content: MaybeRefOrGetter<string | undefined>, toggle: MaybeRefOrGetter<boolean> = true) {
  return usePrettify(content, toggle, 'css')
}

export function useHTMLPrettify(content: MaybeRefOrGetter<string | undefined>, toggle: MaybeRefOrGetter<boolean> = true) {
  return usePrettify(content, toggle, 'html')
}

export function useJSPrettify(content: MaybeRefOrGetter<string | undefined>, toggle: MaybeRefOrGetter<boolean> = true) {
  return usePrettify(content, toggle, 'babel')
}
