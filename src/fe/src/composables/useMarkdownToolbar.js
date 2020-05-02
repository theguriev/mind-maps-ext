import { wrap } from '@/utils/wrap'

export default function (textarea) {
  function textareaWrap (wherewith) {
    const dom = textarea.value
    const { str, start, end } = wrap(dom.value, dom.selectionStart, dom.selectionEnd, wherewith)
    dom.value = str
    dom.focus()
    dom.setSelectionRange(start, end)
    dom.dispatchEvent(
      new Event(
        'input',
        {
          bubbles: true,
          cancelable: true
        }
      )
    )
  }

  function textareaLists (itemFn, offset) {
    const dom = textarea.value
    const start = dom.selectionStart
    const end = dom.selectionEnd
    const newVal = dom.value
      .substr(start, end)
      .split(String.fromCharCode(10))
      .map(itemFn)
      .join(String.fromCharCode(10))
    const endOffset = dom.value
      .substr(start, end)
      .split(String.fromCharCode(10))
      .length * offset

    dom.value = dom.value.substr(0, start) + newVal + dom.value.substr(end, dom.value.length)
    dom.focus()
    dom.setSelectionRange(start, end + endOffset)
    dom.dispatchEvent(
      new Event(
        'input',
        {
          bubbles: true,
          cancelable: true
        }
      )
    )
  }

  function bold () {
    textareaWrap('**')
  }

  function italic () {
    textareaWrap('_')
  }

  function strikethrough () {
    textareaWrap('~~')
  }

  function code () {
    textareaWrap('```')
  }

  function link () {
    const dom = textarea.value
    const start = dom.selectionStart
    const end = dom.selectionEnd
    dom.value = dom.value.substring(0, start) + '[' + dom.value.substr(start, end) + ']' + '(http://beagl.in)'
    dom.focus()
    dom.setSelectionRange(start + 1, end + 1)
    dom.dispatchEvent(
      new Event(
        'input',
        {
          bubbles: true,
          cancelable: true
        }
      )
    )
  }

  function orderedList () {
    textareaLists(
      (line, index) => `${index + 1}. ${line}`,
      3
    )
  }
  function bulletedList () {
    textareaLists(
      (line, index) => `* ${line}`,
      2
    )
  }

  function blockquote () {
    textareaLists(
      (line, index) => `> ${line}`,
      2
    )
  }

  return {
    textareaWrap,
    textareaLists,
    bold,
    italic,
    strikethrough,
    code,
    link,
    orderedList,
    bulletedList,
    blockquote
  }
}
