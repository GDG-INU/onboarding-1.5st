// Type definitions for blogSlice.js
import { ThunkAction } from '@reduxjs/toolkit';

// Define API response types
export interface Post {
  id: number;
  title: string;
  content: string;
  author?: string;
  nickname?: string;
  createdAt: string;
  modifiedAt?: string;
  updatedAt?: string;
  likeCount: number;
  role?: string;
  tags?: string[];
}

// Define Redux state
export interface BlogState {
  posts: Post[];
  currentPost: Post | null;
  relatedArticles: Post[];
  searchResults: Post[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Define thunk action types
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  { blog: BlogState; auth: any },
  unknown,
  any
>;

// Define action creator types
export function getPost(id: string | null): AppThunk;
export function deletePost(id: string | null): AppThunk;
export function fetchRelatedArticles(id: string | null): AppThunk;
export function likePost(id: number | string): AppThunk;
export function addTagsToPost(params: { postId: string | number; tags: string[] }): AppThunk;
export function searchPostsByTag(tagName: string): AppThunk;
export function createPost(postData: any): AppThunk;
export function updatePost(params: { id: string | number; postData: any }): AppThunk;
