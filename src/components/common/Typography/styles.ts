import { css } from "styled-components";

export const dpNormalize = css`
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;

  p {
    margin-top: 0;
  }

  p:first-child,
  ol:first-child,
  ul:first-child {
    margin-top: 0;
  }

  ol, ul {
    padding-inline-start: 20px;
  }

  img {
    width: 100%;
    height: auto;
  }

  a, a:hover {
    color: ${({ theme }) => theme.colors.cyan100};
  }
`;
