import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axiosConfig';

/**
 * @typedef {Object} BlogState
 * @property {Array} posts - List of posts
 * @property {Object|null} currentPost - Current selected post
 * @property {Array} relatedArticles - Related articles list
 * @property {Array} searchResults - Search results list
 * @property {boolean} loading - Loading state 
 * @property {string|null} error - Error message
 * @property {boolean} success - Success state
 */

/**
 * Get all posts
 * @returns {Promise<Array>} - Posts array
 */
export const getPosts = createAsyncThunk(
  'blog/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/board');
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || '게시글 목록을 불러오는데 실패했습니다.');
      }
      return rejectWithValue('네트워크 오류가 발생했습니다.');
    }
  }
);

/**
 * Get a single post
 * @param {string|number} id - Post ID
 * @returns {Promise<Object>} - Post object
 */
export const getPost = createAsyncThunk(
  'blog/getPost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/board/${id}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || '게시글을 불러오는데 실패했습니다.');
      }
      return rejectWithValue('네트워크 오류가 발생했습니다.');
    }
  }
);

/**
 * Delete a post
 * @param {string|number} id - Post ID
 * @returns {Promise<Object>} - Response object
 */
export const deletePost = createAsyncThunk(
  'blog/deletePost',
  async (id, { rejectWithValue }) => {
    try {
      const postId = isNaN(Number(id)) ? id : Number(id);
      const response = await api.delete(`/api/board/${postId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || '게시글 삭제 중 오류가 발생했습니다.');
      }
      return rejectWithValue('네트워크 오류가 발생했습니다.');
    }
  }
);

/**
 * Get related articles
 * @param {string|number} id - Post ID
 * @returns {Promise<Array>} - Related articles array
 */
export const fetchRelatedArticles = createAsyncThunk(
  'blog/fetchRelatedArticles',
  async (id, { rejectWithValue }) => {
    try {
      const postId = isNaN(Number(id)) ? id : Number(id);
      const response = await api.get(`/api/board/${postId}/list`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || '관련 게시글을 불러오는 중 오류가 발생했습니다.');
      }
      return rejectWithValue('네트워크 오류가 발생했습니다.');
    }
  }
);

/**
 * Like a post
 * @param {string|number} id - Post ID
 * @returns {Promise<Object>} - Updated post object
 */
export const likePost = createAsyncThunk(
  'blog/likePost',
  async (id, { rejectWithValue }) => {
    try {
      const postId = isNaN(Number(id)) ? id : Number(id);
      const response = await api.post(`/api/board/${postId}/like`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || '좋아요 처리 중 오류가 발생했습니다.');
      }
      return rejectWithValue('네트워크 오류가 발생했습니다.');
    }
  }
);

/**
 * Search posts by tag
 * @param {string} tagName - Tag name to search for
 * @returns {Promise<Array>} - Posts matching the tag
 */
export const searchPostsByTag = createAsyncThunk(
  'blog/searchPostsByTag',
  async (tagName, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/board/tags?name=${encodeURIComponent(tagName)}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || '태그 검색 중 오류가 발생했습니다.');
      }
      return rejectWithValue('네트워크 오류가 발생했습니다.');
    }
  }
);

/**
 * Add tags to a post
 * @param {Object} params - Parameters object
 * @param {string|number} params.postId - Post ID
 * @param {Array<string>} params.tags - Tags array
 * @returns {Promise<Object>} - Response with updated post
 */
export const addTagsToPost = createAsyncThunk(
  'blog/addTagsToPost',
  async ({ postId, tags }, { rejectWithValue }) => {
    try {
      const id = isNaN(Number(postId)) ? postId : Number(postId);
      const response = await api.post(`/api/board/${id}/tags`, { tags });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || '태그 추가 중 오류가 발생했습니다.');
      }
      return rejectWithValue('네트워크 오류가 발생했습니다.');
    }
  }
);

/**
 * Create a post
 * @param {Object} postData - Post data object
 * @returns {Promise<Object>} - Created post object
 */
export const createPost = createAsyncThunk(
  'blog/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/board', postData);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || '게시글 작성 중 오류가 발생했습니다.');
      }
      return rejectWithValue('네트워크 오류가 발생했습니다.');
    }
  }
);

/**
 * Update a post
 * @param {Object} params - Parameters object
 * @param {string|number} params.id - Post ID
 * @param {Object} params.postData - Post data object
 * @returns {Promise<Object>} - Updated post object
 */
export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async ({ id, postData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/board/${id}`, postData);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || '게시글 수정 중 오류가 발생했습니다.');
      }
      return rejectWithValue('네트워크 오류가 발생했습니다.');
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    currentPost: null,
    relatedArticles: [],
    searchResults: [],
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // 게시글 작성
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentPost = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 게시글 조회
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 게시글 수정
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentPost = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 게시글 삭제
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.currentPost = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 관련 게시글 목록
      .addCase(fetchRelatedArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelatedArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedArticles = action.payload;
      })
      .addCase(fetchRelatedArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 게시글 좋아요
      .addCase(likePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        
        // 현재 보고 있는 게시글의 좋아요가 업데이트된 경우
        if (state.currentPost && state.currentPost.id === action.payload.id) {
          state.currentPost = action.payload;
        }
        
        // 관련 게시글 목록에서 해당 게시글 업데이트
        if (state.relatedArticles.length > 0) {
          state.relatedArticles = state.relatedArticles.map(article => 
            article.id === action.payload.id ? action.payload : article
          );
        }
        
        // 게시글 목록에서도 해당 게시글 업데이트
        if (state.posts.length > 0) {
          state.posts = state.posts.map(post => 
            post.id === action.payload.id ? action.payload : post
          );
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 해시태그 검색
      .addCase(searchPostsByTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPostsByTag.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchPostsByTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 게시글에 해시태그 추가
      .addCase(addTagsToPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTagsToPost.fulfilled, (state, action) => {
        state.loading = false;
        
        // 현재 보고 있는 게시글이 업데이트된 경우
        if (state.currentPost && state.currentPost.id === action.payload.data.id) {
          state.currentPost = action.payload.data;
        }
        
        // 게시글 목록에서도 해당 게시글 업데이트
        if (state.posts.length > 0) {
          state.posts = state.posts.map(post => 
            post.id === action.payload.data.id ? action.payload.data : post
          );
        }
      })
      .addCase(addTagsToPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSuccess } = blogSlice.actions;
export default blogSlice.reducer;
