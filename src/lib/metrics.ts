import { Octokit } from '@octokit/rest'
import { google } from 'googleapis'

import { site } from '@/config/site'

import googleAuth from './google'
import prisma from './prisma'

export type GitHubStats = {
  followers: number
  stars: number
}

export type YouTubeStats = {
  subscribers: number
  views: number
}

export type BlogViews = {
  views: number
}

export const getGitHubStats = async (): Promise<GitHubStats> => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  })

  const {
    data: { followers },
  } = await octokit.request('GET /users/{username}', {
    username: site.githubUsername,
  })

  const { data: repos } = await octokit.request('GET /users/{username}/repos', {
    username: site.githubUsername,
  })

  const stars = repos
    .filter((repo) => !repo.fork)
    .reduce((acc, repo) => {
      return acc + (repo.stargazers_count ?? 0)
    }, 0)

  return {
    followers,
    stars,
  }
}

export const getYouTubeStats = async (): Promise<YouTubeStats> => {
  const auth = await googleAuth.getClient()
  const youtube = google.youtube({
    auth,
    version: 'v3',
  })

  const response = await youtube.channels.list({
    id: ['UC2hMWOaOlk9vrkvFVaGmn0Q'],
    part: ['statistics'],
  })

  if (!response.data || !response.data.items) {
    throw new Error('Response data or items are undefined')
  }

  const channel = response.data.items[0]
  const statistics = channel.statistics

  if (!statistics) {
    throw new Error('Statistics not found')
  }

  return {
    subscribers: Number(statistics.subscriberCount),
    views: Number(statistics.viewCount),
  }
}

export const getBlogViews = async (): Promise<BlogViews> => {
  const totalViews = await prisma.post.aggregate({
    _sum: {
      views: true,
    },
  })

  return {
    views: totalViews._sum.views ?? 0,
  }
}
