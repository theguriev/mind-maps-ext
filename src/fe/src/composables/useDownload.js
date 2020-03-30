import domtoimage from 'dom-to-image'

export default function (dom) {
  function generateDownload (ext) {
    return function (dataUrl) {
      const link = document.createElement('a')
      link.download = `download.${ext}`
      link.href = dataUrl
      link.click()
    }
  }

  function saveSvg () {
    domtoimage.toSvg(dom.value.$el).then(generateDownload('svg'))
  }

  function savePng () {
    domtoimage.toPng(dom.value.$el).then(generateDownload('png'))
  }

  function saveJpeg () {
    domtoimage.toJpeg(dom.value.$el).then(generateDownload('jpg'))
  }

  return {
    saveSvg,
    savePng,
    saveJpeg
  }
}
