import React from "react";
import styled, { css } from "styled-components";
import useDetectClose from "../../../hooks/useDetectClose";

const DropdownMenu = () => {
  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);
  const [boardIsOpen, boardRef, boardHandler] = useDetectClose(false);

  const logoutClickHandler = () => {
    // console.log("logout");
  };

  return (
    <Wrapper>
      <DropdownContainer>
        <DropdownButton onClick={myPageHandler} ref={myPageRef}>
          내 정보
        </DropdownButton>
        <Menu isDropped={myPageIsOpen}>
          <Ul>
            <Li>
              <LinkWrapper href="#1-1">비밀번호 수정</LinkWrapper>
            </Li>
          </Ul>
        </Menu>
      </DropdownContainer>

      <Logout onClick={logoutClickHandler}>로그아웃</Logout>
    </Wrapper>
  );
};

export default DropdownMenu;

const Wrapper = styled.div`
  margin: 10px;
  position: relative;

  justify-content: space-around;
  align-items: center;
  color: white;
  font-size: 14px;
  background: #64CD3C;
  width: 100%;
  height: 32px;
  font-weight: bold;
`;

const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
`;

const DropdownButton = styled.div`
  cursor: pointer;
`;

const Menu = styled.div`
  background: oldlace;
  position: absolute;
  top: 52px;
  left: 50%;
  width: 100px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;
  border-radius:: 5px;

  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 10px solid transparent;
    border-top-width: 0;
    border-bottom-color: oldlace;
  }

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const Ul = styled.ul`
  & > li {
    margin-bottom: 10px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Li = styled.li``;

const LinkWrapper = styled.a`
  font-size: 12px;
  text-decoration: none;
  color: white;
`;

const Logout = styled.div`
  cursor: pointer;
  font-size: 14px;
  display: block;
  text-decoration: none;
  color: white;
`;
