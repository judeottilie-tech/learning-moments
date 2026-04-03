export const createPostLike = (postLikes) => {
  return fetch("http://localhost:8088/postLikes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postLikes),
  }).then((res) => res.json())
}
