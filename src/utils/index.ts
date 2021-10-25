import { readdirSync, statSync } from 'fs'
import fetch from 'node-fetch'

// from https://gist.github.com/kethinov/6658166
export function readRecursively (dirPath: string, fileList: string[] = []) {
  const files = readdirSync(dirPath)
  for (const file of files) {
    const filePath = dirPath + '/' + file
    const stat = statSync(filePath)

    if (stat.isFile()) fileList.push(filePath)
    else fileList = readRecursively(filePath, fileList)
  }

  return fileList
}

export async function isYoutubeIdValid(videoId: string) {
  const url = 'https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=' + videoId

  const { status } = await fetch(url)

  if (status != 200) {
    return false
  }
  return true
}