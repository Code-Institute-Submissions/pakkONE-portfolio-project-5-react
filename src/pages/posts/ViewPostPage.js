import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom";
import PostDetail from "./PostDetail";

const ViewPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
        ]);
        setPost({ results: [post] });
      } catch (error) {
        console.log(error);
      }
    };
    handleMount();
  }, [id]);

  return (
    <div>
      <Container fluid className="p-3">
        <Row className="justify-content-center">
          <Col md={10} className={`p-3 my-3 bg-light rounded-4`}>
            <Container className="m-1 py-2 px-5 text-center">
              <PostDetail {...post.results[0]} setPost={setPost} PostDetail />
              <Container>Comments</Container>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ViewPostPage;