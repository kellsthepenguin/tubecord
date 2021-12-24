import { readdirSync, statSync } from 'fs'
import fetch from 'node-fetch'
import { VideoInfo } from '../types/index.js'

const YOUTUBE_BASE_URL = 'https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v='

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
  const url = YOUTUBE_BASE_URL + videoId

  const { status } = await fetch(url)

  if (status != 200) {
    return false
  }
  return true
}

export async function getYoutubeVideoInfo (videoId: string) {
  const url = YOUTUBE_BASE_URL + videoId

  const res = await fetch(url)
  const info: VideoInfo = await res.json() as VideoInfo
  
  return info
}