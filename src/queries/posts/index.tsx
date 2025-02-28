import { CreateCardRequest, Post, PostsParams, PostsResponse } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const usePostsQuery = (params: PostsParams) => {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: async () => {
      const response = await axios.get<PostsResponse>('/api/posts', {
        params,
      });
      return response.data;
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateCardRequest) => {
      const response = await axios.post<Post>('/api/posts', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
