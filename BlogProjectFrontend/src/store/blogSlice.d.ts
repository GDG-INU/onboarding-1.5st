// Type definitions for blogSlice.js
import { ThunkAction } from '@reduxjs/toolkit';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

// Define API response types - Renamed Post to Article
export interface Article {
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
  posts: Article[]; // Use Article type
  currentPost: Article | null; // Use Article type
  relatedArticles: Article[]; // Use Article type
  searchResults: Article[]; // Use Article type
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Define RootState explicitly for import
export interface RootState {
  blog: BlogState;
  auth: any; // Consider defining auth state more strictly later
}

// Define thunk action types (Internal usage, RootState defined above)
type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

// Define AppDispatch explicitly for import
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

// Define action creator types
export function getPost(id: string | null): AppThunk;
export function deletePost(id: string | null): AppThunk;
export function fetchRelatedArticles(id: string | null): AppThunk;
export function likePost(id: number | string): AppThunk;
export function addTagsToPost(params: { postId: string | number; tags: string[] }): AppThunk;
export function searchPostsByTag(tagName: string): AppThunk;
export function createPost(postData: any): AppThunk;
export function updatePost(params: { id: string | number; postData: any }): AppThunk;
