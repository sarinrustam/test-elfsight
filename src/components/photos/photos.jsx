import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPhotosByAlbum } from '../../reducer/selectors';
import Popup from '../popup/popup.jsx';

const PhotosList = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 5px;
`;

const PhotosTitle = styled.p`
  margin: 15px 0 30px 0;
  font-size: 24px;
  line-height: 26px;
  font-weight: 600;

  @media (min-width: 1280px) {
    font-size: 30px;
    line-height: 34px;
  }
`;

const PhotosBackButton = styled.button`
  position: absolute;
  top: 12px;
  left: 15px;
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background: linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  display: inline-block;
  cursor: pointer;
  color: #666666;
  padding: 5px 5px 2px 10px;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;

  &:hover {
    background: linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
    background-color: #f6f6f6;
  }

  @media (min-width: 1280px) {
    top: 22px;
    left: 30px;
  }
`;

const PhotosItem = styled.img`
  width: 180px;
  height: 180px;
  background-image: url(${(props) => props.src});
  margin-right: 15px;
  margin-left: 15px;
  margin-bottom: 15px;
`;

const PhotosGallery = styled.img`
  width: 250px;
  height: 250px;
  background-image: url(${(props) => props.src});

  @media (min-width: 1280px) {
    width: 600px;
    height: 600px;
  }
`;

const PhotosGalleryWrapper = styled.div`
  line-height: 0;
  position: relative;
`;

const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

const ButtonIcon = styled.img`
  width: 20px;
  height: 20px;

  @media (min-width: 1280px) {
    width: 40px;
    height: 40px;
  }
`;

const NextButton = styled(PrevButton)`
  top: 50%;
  right: 10px;
  left: auto;
`;

class Photos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      chosenPhoto: null,
    };

    this.handleClickPhoto = this.handleClickPhoto.bind(this);
    this.handlePrevPhoto = this.handlePrevPhoto.bind(this);
    this.handleNextPhoto = this.handleNextPhoto.bind(this);
    this.handlePopupClose = this.handlePopupClose.bind(this);
  }

  handleClickPhoto(photo) {
    this.setState({
      isModalOpen: true,
      chosenPhoto: photo,
    });
  }

  handleNextPhoto() {
    const currentIndex = this.props.photosByAlbum.indexOf(this.state.chosenPhoto);
    this.setState({
      chosenPhoto: this.props.photosByAlbum[currentIndex + 1],
    });
  }

  handlePrevPhoto() {
    const currentIndex = this.props.photosByAlbum.indexOf(this.state.chosenPhoto);
    this.setState({
      chosenPhoto: this.props.photosByAlbum[currentIndex - 1],
    });
  }

  handlePopupClose() {
    this.setState({
      isModalOpen: false,
      chosenPhoto: null,
    });
  }

  render() {
    const { photosByAlbum } = this.props;
    return (
      <>
        <Link style={{ lineHeight: '0' }} to="/">
          <PhotosBackButton>
            <ButtonIcon src="/backArrow.svg" alt="Изображение стрелки" />
          </PhotosBackButton>
        </Link>
        <PhotosTitle>Фотографии</PhotosTitle>
        <PhotosList>
          {photosByAlbum.map((photo) => (
            <PhotosItem
              key={photo.id}
              src={photo.thumbnailUrl}
              onClick={() => {
                this.handleClickPhoto(photo);
              }}
            />
          ))}
        </PhotosList>
        {this.state.isModalOpen ? (
          <Popup handlePopupClose={this.handlePopupClose}>
            <PhotosGalleryWrapper>
              <PhotosGallery src={this.state.chosenPhoto.url} />
              <PrevButton
                disabled={photosByAlbum.indexOf(this.state.chosenPhoto) === 0}
                onClick={this.handlePrevPhoto}
              >
                <ButtonIcon src="/prevSkip.svg" />
              </PrevButton>
              <NextButton
                disabled={
                  photosByAlbum.indexOf(this.state.chosenPhoto)
                  === photosByAlbum.length - 1
                }
                onClick={this.handleNextPhoto}
              >
                <ButtonIcon src="/nextSkip.svg" />
              </NextButton>
            </PhotosGalleryWrapper>
          </Popup>
        ) : (
          ''
        )}
      </>
    );
  }
}

Photos.propTypes = {
  photosByAlbum: PropTypes.shape([]).isRequired,
};

const mapStateToProps = (state, props) => ({
  photosByAlbum: getPhotosByAlbum(state, props.albumId),
});

export default connect(mapStateToProps, null)(Photos);
