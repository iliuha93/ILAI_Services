import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type DishPhotoMap = Map<string, string>;

interface UseDishPhotosResult {
  photoMap: DishPhotoMap;
  loading: boolean;
  refetch: () => Promise<void>;
  upsertPhoto: (dishId: string, photoUrl: string, source: "upload" | "ai_generated") => Promise<void>;
  deletePhoto: (dishId: string) => Promise<void>;
}

export function useDishPhotos(): UseDishPhotosResult {
  const [photoMap, setPhotoMap] = useState<DishPhotoMap>(new Map());
  const [loading, setLoading] = useState(false);

  const fetchPhotos = async () => {
    // dish_photos table not yet created — return empty map
    setPhotoMap(new Map());
  };

  const upsertPhoto = async (
    dishId: string,
    photoUrl: string,
    _source: "upload" | "ai_generated"
  ) => {
    setPhotoMap((prev) => new Map(prev).set(dishId, photoUrl));
  };

  const deletePhoto = async (dishId: string) => {
    setPhotoMap((prev) => {
      const next = new Map(prev);
      next.delete(dishId);
      return next;
    });
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return { photoMap, loading, refetch: fetchPhotos, upsertPhoto, deletePhoto };
}

/**
 * Upload a File to the `dish-photos` Supabase Storage bucket and return the public URL.
 */
export async function uploadDishPhoto(dishId: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${dishId}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("dish-photos")
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("dish-photos").getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Save a remote URL (e.g. from DALL-E) into the `dish-photos` bucket.
 */
export async function saveRemotePhotoToBucket(dishId: string, remoteUrl: string): Promise<string> {
  const response = await fetch(remoteUrl);
  const blob = await response.blob();
  const file = new File([blob], `${dishId}-ai.jpg`, { type: "image/jpeg" });
  return uploadDishPhoto(dishId, file);
}
