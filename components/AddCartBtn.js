import styled from "@emotion/styled";
import { device } from "../styles/device";

const AddCartBtn = styled.a`
  background: var(--primary);
  display: flex;
  border-radius: 15px;
  justify-content: center;
  padding: 5px 15px;
  width: max-content;
  @media ${device.tablet} {
    width: auto
  }
`;

export default AddCartBtn;
