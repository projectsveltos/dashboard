import { useMutation, useQueryClient } from "@tanstack/react-query";

import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";
import {
  CreateProfileRequest,
  UpdateProfileRequest,
  DeleteProfileRequest,
} from "@/types/profile.types";

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CreateProfileRequest) =>
      client.post(API_ENDPOINTS.PROFILE, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: UpdateProfileRequest) =>
      client.put(API_ENDPOINTS.PROFILE, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      queryClient.invalidateQueries({ queryKey: ["profile-info"] });
    },
  });
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: DeleteProfileRequest) =>
      client.delete(API_ENDPOINTS.PROFILE, { data: request }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
};
