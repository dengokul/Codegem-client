import React, { useEffect, useState } from "react";
import {
  ToastContainer,
  Toast,
  Button,
  Row,
  Col,
  Form,
  ToggleButton,
  ButtonGroup,
  Card,
  ListGroup,
} from "react-bootstrap";
import { memberOptions, tagOptions } from "data";
import Select from "react-select";
import feedbackService from "services/feedback";
import moment from "moment";

const Home = () => {
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [feedbackData, setFeedbackData] = useState<any>([]);
  const [feedbackDetails, setFeedbackDetails] = useState<any>({});
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [shareVal, setShareVal] = useState("");
  const [membersVal, setMembersVal] = useState<any>("");
  const [tagsVal, setTagsVal] = useState<any>("");
  const [sharedChecked, setSharedChecked] = useState(false);
  const [limitedChecked, setLimitedChecked] = useState(false);
  const [ananymousChecked, setAnanymousChecked] = useState(false);
  const { GetAllFeedback, SaveFeedback } = feedbackService();

  useEffect(() => {
    getAllFeedback();
  }, []);

  const getAllFeedback = async () => {
    const feedbackDataRes = await GetAllFeedback();
    setFeedbackData(feedbackDataRes);
    if (feedbackDataRes.length > 0) {
      setFeedbackDetails(feedbackDataRes[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (shareVal && membersVal && tagsVal) {
      const feedbackValues = {
        shareVal,
        members: membersVal,
        tags: tagsVal,
        shareTo: {
          shared: sharedChecked,
          limited: limitedChecked,
          ananymous: ananymousChecked,
        },
      };
      SaveFeedback(feedbackValues)
        .then((res) => {
          setIsFormSubmit(true);
          getAllFeedback();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCreateNew = (e: React.MouseEvent<HTMLElement>) => {
    setShareVal("");
    setMembersVal("");
    setTagsVal("");
    setSharedChecked(false);
    setLimitedChecked(false);
    setAnanymousChecked(false);
    setIsFormSubmit(false);
  };

  console.log("feedbackData", feedbackData);

  if (feedbackData && feedbackData.members) {
    console.log("feedbackData 123", feedbackData.members);
  }

  return (
    <>
      <Row>
        <Col md={6} className="mb-2">
          <Row>
            <Col md={4} className="mb-2">
              <Card>
                <Card.Header className="text-center">My Log</Card.Header>
                <ListGroup variant="flush">
                  {feedbackData.length > 0 &&
                    feedbackData.map((item: any) => {
                      return (
                        <ListGroup.Item key={item.id} className="text-center">
                          <Button
                            variant={`${
                              feedbackDetails.id === item.id
                                ? "primary"
                                : "secondary"
                            }`}
                            onClick={() => setFeedbackDetails(item)}
                          >
                            {moment(item.createdAt).format("DD MMM YYYY h A")}
                          </Button>
                        </ListGroup.Item>
                      );
                    })}
                </ListGroup>
              </Card>
            </Col>
            <Col md={8} className="mb-2">
              {feedbackDetails && feedbackDetails.id && (
                <Card border="dark" style={{ width: "18rem" }}>
                  <Card.Header>
                    {moment(feedbackDetails.createdAt).format(
                      "DD MMM YYYY h A"
                    )}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{feedbackDetails.shareVal}</Card.Title>
                    <Card.Text>
                      {feedbackDetails &&
                        feedbackDetails.members &&
                        feedbackDetails.members.length > 0 &&
                        feedbackDetails.members.map(
                          (item: any, index: number) => {
                            return (
                              <Button variant={"light"} key={index}>
                                {item.label}
                              </Button>
                            );
                          }
                        )}
                    </Card.Text>
                    <Card.Text>
                      {feedbackDetails &&
                        feedbackDetails.tags &&
                        feedbackDetails.tags.length > 0 &&
                        feedbackDetails.tags.map((item: any, index: number) => {
                          return (
                            <Button variant={"light"} key={index}>
                              {item.label}
                            </Button>
                          );
                        })}
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
          <Button
            onClick={() => setShowFeedbackForm(!showFeedbackForm)}
            className="mb-2 btn"
            type="button"
            style={{
              position: "fixed",
              top: "50%",
              right: "0px",
              height: "50px",
              width: "7px",
              transition: "transform 0.3s ease-in",
            }}
          />
          <ToastContainer position="top-end" className="p-3">
            <Toast
              show={showFeedbackForm}
              onClose={() => {
                setIsFormSubmit(false);
                setShowFeedbackForm(!showFeedbackForm);
              }}
            >
              <Toast.Header>
                <strong className="me-auto">{`${
                  isFormSubmit ? "Thanks for sharing!" : "Sharing Feedback"
                }`}</strong>
              </Toast.Header>
              <Toast.Body>
                {isFormSubmit ? (
                  <div className="d-grid gap-2">
                    <div>We received your feedback!</div>
                    <Button
                      variant="dark"
                      type="submit"
                      onClick={handleCreateNew}
                    >
                      Create Another!
                    </Button>
                  </div>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        as="textarea"
                        placeholder="What would you like to share?"
                        onChange={(e) => setShareVal(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Select
                        options={memberOptions}
                        isMulti
                        name="colors"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        isClearable={true}
                        isSearchable={true}
                        placeholder={"Who is this feedback for?"}
                        onChange={(e) => setMembersVal(e)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Select
                        options={tagOptions}
                        isMulti
                        name="colors"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        isClearable={true}
                        isSearchable={true}
                        placeholder={"What can be tag?"}
                        onChange={(e) => setTagsVal(e)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <ButtonGroup className="mb-2">
                        <ToggleButton
                          id="tbg-check-1"
                          type="checkbox"
                          value={"shared"}
                          checked={sharedChecked}
                          onChange={(e) =>
                            setSharedChecked(e.currentTarget.checked)
                          }
                        >
                          Shared
                        </ToggleButton>
                        <ToggleButton
                          id="tbg-check-2"
                          type="checkbox"
                          value={"limited"}
                          checked={limitedChecked}
                          onChange={(e) =>
                            setLimitedChecked(e.currentTarget.checked)
                          }
                        >
                          Limited
                        </ToggleButton>
                        <ToggleButton
                          id="tbg-check-3"
                          type="checkbox"
                          value={"ananymous"}
                          checked={ananymousChecked}
                          onChange={(e) =>
                            setAnanymousChecked(e.currentTarget.checked)
                          }
                        >
                          Ananymous
                        </ToggleButton>
                      </ButtonGroup>
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Button variant="dark" type="submit">
                        Ready to go!
                      </Button>
                    </div>
                  </Form>
                )}
              </Toast.Body>
            </Toast>
          </ToastContainer>
        </Col>
      </Row>
    </>
  );
};

export default Home;
