export async function apiRequest<T>(promise: any) {
  try {
    const response = await promise;
    return {
      success: true,
      data: response.data as T,
      message: "OK",
    };
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.response?.data ||
      err?.message ||
      "Unknown error occurred.";

    return {
      success: false,
      data: null,
      message,
    };
  }
}