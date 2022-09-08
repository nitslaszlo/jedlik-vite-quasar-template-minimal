import $axios from "./axios.instance";
import { defineStore } from "pinia";
import { Notify, Loading } from "quasar";

export interface IPost {
  _id: string;
  author: string;
  content: string;
  title: string;
}

interface IState {
  numberOfPosts: number;
  posts: Array<IPost>;
}

interface IPaginatedParams {
  offset: number;
  limit: string;
  order: string;
  sort: string;
  keyword?: string;
}

interface IIdParams {
  _id: string;
}

export interface IEditParams {
  _id: string;
  content: string;
  title: string;
}

export interface INewPostParams {
  content: string;
  title: string;
}

export const usePostsStore = defineStore({
  id: "postsStore",
  state: (): IState => ({
    numberOfPosts: 0,
    posts: [],
  }),
  getters: {
    getPosts(): Array<IPost> {
      return this.posts;
    },
    getNumberOfPosts(): number {
      return this.numberOfPosts;
    },
  },
  actions: {
    async createNewPost(params: INewPostParams): Promise<void> {
      Loading.show();
      $axios
        .post("posts", {
          title: params.title,
          content: params.content,
        })
        .then((res) => {
          if (res && res.data) {
            console.log(res.data.post);
            this.numberOfPosts = res.data.count;
          }
          Loading.hide();
        })
        .catch((error) => {
          console.error("hiba: " + error);
          // context.commit("setLoading", false);
          Loading.hide();
          Notify.create({ message: `Error in create post: ${error.message}`, color: "negative" });
        });
    },
    async editPostById(params: IEditParams): Promise<void> {
      Loading.show();
      $axios
        .patch(`posts/${params._id}`, {
          title: params.title,
          content: params.content,
        })
        .then((res) => {
          if (res && res.data) {
            console.log(res.data);
          }
          Loading.hide();
        })
        .catch((error) => {
          Loading.hide();
          Notify.create({ message: `Error in edit post: ${error.message}`, color: "negative" });
        });
    },
    async deletePostById(params: IIdParams): Promise<void> {
      Loading.show();
      $axios
        .delete(`posts/${params._id}`)
        .then((res) => {
          if (res && res.data) {
            console.log(res.data.status);
            this.posts = this.posts.filter((i) => i._id !== params._id);
            this.numberOfPosts = this.numberOfPosts - 1;
          }
          Loading.hide();
        })
        .catch((error) => {
          Loading.hide();
          Notify.create({ message: `Error in delete post: ${error.message}`, color: "negative" });
        });
    },
    async fetchPosts(): Promise<void> {
      Loading.show();
      $axios
        .get("posts")
        .then((res) => {
          if (res && res.data) {
            this.posts = res.data.posts;
            this.numberOfPosts = res.data.count;
          }
          Loading.hide();
        })
        .catch((error) => {
          Loading.hide();
          Notify.create({ message: `Error in fetch posts: ${error.message}`, color: "negative" });
        });
    },
    async fetchPaginatedPosts(params: IPaginatedParams): Promise<void> {
      Loading.show();
      $axios
        .get(
          `posts/${params.offset}/${params.limit}/${params.order}/${params.sort}/${params.keyword}`
        )
        .then((res) => {
          if (res && res.data) {
            this.posts = res.data.posts;
            this.numberOfPosts = res.data.count;
          }
          Loading.hide();
        })
        .catch((error) => {
          console.error("hiba: " + error);
          Loading.hide();
          Notify.create({
            message: `Error in paginated fetch posts: ${error.message}`,
            color: "negative",
          });
        });
    },
  },
});
