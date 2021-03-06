import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


export default function TablePager({ currentPage, pageCount, handlePageChange, ...props }) {
  const canIncrement = currentPage + 1 <= pageCount;
  const canDecrement = currentPage - 1 > 0;

  const handleFirst = () => handlePageChange(1);
  const handleDecrement = () => {
    if (canDecrement) handlePageChange(currentPage - 1);
  };
  const handleIncrement = () => {
    if (canIncrement) handlePageChange(currentPage + 1);
  };
  const handleLast = () => handlePageChange(pageCount);

  return (
    <Wrapper {...props}>
      <Button onClick={handleFirst} disabled={!canDecrement}>
        {'<<'}
      </Button>
      <Button onClick={handleDecrement} disabled={!canDecrement}>
        {'<'}
      </Button>
      <ActivePage>
        <PageWrapper>{currentPage}</PageWrapper>
      </ActivePage>
      <Button onClick={handleIncrement} disabled={!canIncrement}>
        {'>'}
      </Button>
      <Button onClick={handleLast} disabled={!canIncrement}>
        {'>>'}
      </Button>
    </Wrapper>
  );
}

TablePager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  width: 190px;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 35px;
  height: 35px;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const ActivePage = styled.div`
  width: 35px;
  height: 35px;
  background: #112d7b;
  color: #fff;
  display: flex;
`;

const PageWrapper = styled.span`
  margin: auto;
`;
