import { Flex } from "@chakra-ui/react";
import { EntityId, EntityState } from "@reduxjs/toolkit";
import {
  HiOutlineAnnotation,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useGetCommentsQuery } from "../../app/features/comments/commentsApiSlice";
import { useGetPostsQuery } from "../../app/features/posts/postsApiSlice";
import { useGetUsersQuery } from "../../app/features/users/usersApiSlice";
import CommentsTable from "../../components/admin/board/CommentsTable";
import PostsTable from "../../components/admin/board/PostsTable";
import StatsCard, { Stats } from "../../components/admin/board/StatsCard";
import UsersTable from "../../components/admin/board/UsersTable";
import Comment from "../../entities/Comment";
import Post from "../../entities/Post";
import User from "../../entities/User";

const Board = () => {
  const { data: commentsData, isSuccess: isSuccessComments } =
    useGetCommentsQuery({ data: "commentsList", limit: 5 });
  const comments = commentsData?.comments;
  const commentsStats = commentsData?.stats;
  // console.log(commentsData);

  const { data: postsData, isSuccess: isSuccessPosts } = useGetPostsQuery({
    data: "postsList",
    limit: 5,
  });
  const posts = postsData?.posts;
  const postsStats = postsData?.stats;
  // console.log(postsData);

  const { data: usersData, isSuccess: isSuccessUsers } = useGetUsersQuery({
    data: "usersList",
    limit: 5,
  });
  const users = usersData?.users;
  const usersStats = usersData?.stats;
  // console.log(usersData);

  return (
    <>
      <Flex p={3} direction="column">
        {/* Summary Cards */}
        <Flex
          gap={4}
          direction={{ base: "column", lg: "row" }}
          flexWrap={{ lg: "wrap" }}
        >
          <StatsCard
            name="Total Users"
            stats={usersStats as Stats}
            icon={
              <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
            }
          />
          <StatsCard
            name="Total Posts"
            stats={postsStats as Stats}
            icon={
              <HiOutlineDocumentText className="bg-blue-600 text-white rounded-full text-5xl p-3 shadow-lg" />
            }
          />
          <StatsCard
            name="Total Comments"
            stats={commentsStats as Stats}
            icon={
              <HiOutlineAnnotation className="bg-purple-600 text-white rounded-full text-5xl p-3 shadow-lg" />
            }
          />
        </Flex>

        {/* Summary Tables */}
        <Flex
          mt={4}
          gap={4}
          py={3}
          direction={{ base: "column", lg: "row" }}
          flexWrap={{ lg: "wrap" }}
        >
          <PostsTable
            isSuccess={isSuccessPosts}
            posts={posts as EntityState<Post, EntityId>}
          />
          <UsersTable
            isSuccess={isSuccessUsers}
            users={users as EntityState<User, EntityId>}
          />
          <CommentsTable
            isSuccess={isSuccessComments}
            comments={comments as EntityState<Comment, EntityId>}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Board;
