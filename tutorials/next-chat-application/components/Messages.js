import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from 'mdb-react-ui-kit';
import { useRef, useEffect } from 'react';

const Messages = ({
  handleMessage,
  message,
  handleSubmit,
  messages,
  username,
}) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); //Scroll to bottom functionality.
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <MDBCol md="6" lg="7" xl="8">
      <MDBTypography listUnStyled>
        {messages.map(item => {
          if (item.user === username) {
            return (
              <li
                className="d-flex justify-content-between mb-4"
                ref={messagesEndRef}
              >
                <img
                  src="https://i.postimg.cc/85nKtgFz/user.png"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                  width="60"
                />
                <MDBCard className="w-100">
                  <MDBCardHeader className="d-flex justify-content-between p-3">
                    <p
                      className="fw-bold mb-0"
                      style={{ color: '#e7653d' }}
                    >
                      {item.user}
                    </p>
                    <p className="text-muted small mb-0">
                      <MDBIcon far icon="clock" />
                      {new Date(
                        item.time
                      ).toLocaleTimeString('en', {
                        timeStyle: 'short',
                        hour12: false,
                        timeZone: 'UTC',
                      })}
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">{item.chats}</p>
                  </MDBCardBody>
                </MDBCard>
              </li>
            );
          }
          return (
            <li
              className="d-flex justify-content-between mb-4"
              ref={messagesEndRef}
            >
              <MDBCard className="w-100">
                <MDBCardHeader className="d-flex justify-content-between p-3">
                  <p
                    className="fw-bold mb-0"
                    style={{ color: '#e7653d' }}
                  >
                    {item.user}
                  </p>
                  <p className="text-muted small mb-0">
                    <MDBIcon far icon="clock" />
                    {new Date(item.time).toLocaleTimeString(
                      'en',
                      {
                        timeStyle: 'short',
                        hour12: false,
                        timeZone: 'UTC',
                      }
                    )}
                  </p>
                </MDBCardHeader>
                <MDBCardBody>
                  <p className="mb-0">{item.chats}</p>
                </MDBCardBody>
              </MDBCard>
              <img
                src="https://i.postimg.cc/85nKtgFz/user.png"
                alt="avatar"
                className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                width="60"
              />
            </li>
          );
        })}
        <li className="bg-white mb-3">
          <MDBTextArea
            label="Message"
            id="textAreaExample"
            rows={3}
            value={message} //Setting value to the message props received
            onChange={e => handleMessage(e.target.value)} //Sending the input in the Text Area
          />
        </li>
        <MDBBtn
          rounded
          className="float-end"
          style={{
            backgroundColor: '#e7653d',
          }}
          onClick={handleSubmit}
        >
          Send
        </MDBBtn>
      </MDBTypography>
    </MDBCol>
  );
};

export default Messages;
