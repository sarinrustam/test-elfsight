import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPhotosByAlbum } from "../../reducer/selectors";
import Popup from "../popup/popup.jsx";

const PhotosList = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const PhotosTitle = styled.p`
  margin: 15px 0 15px 0;
  font-size: 24px;
  line-height: 26px;
  font-weight: 600;
`;

const PhotosItem = styled.img`
  width: 180px;
  height: 180px;
  background-image: url(${(props) => props.src});
  margin-right: 5px;
  margin-bottom: 5px;
`;

const PhotosGallery = styled.img`
  width: 300px;
  height: 300px;
  background-image: url(${(props) => props.src});
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
    const currentIndex = this.props.photosByAlbum.indexOf(
      this.state.chosenPhoto
    );
    this.setState({
      chosenPhoto: this.props.photosByAlbum[currentIndex + 1],
    });
  }

  handlePrevPhoto() {
    const currentIndex = this.props.photosByAlbum.indexOf(
      this.state.chosenPhoto
    );
    this.setState({
      chosenPhoto: this.props.photosByAlbum[currentIndex - 1],
    })
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
        <PhotosTitle>Фотографии</PhotosTitle>
        <PhotosList>
          {photosByAlbum.map((photo) => {
            return (
              <PhotosItem
                key={photo.id}
                src={photo.thumbnailUrl}
                onClick={() => {
                  this.handleClickPhoto(photo);
                }}
              />
            );
          })}
        </PhotosList>
        {this.state.isModalOpen ? (
          <Popup handlePopupClose={this.handlePopupClose}>
            <PhotosGalleryWrapper>
              <PhotosGallery src={this.state.chosenPhoto.url} />
              <PrevButton disabled={photosByAlbum.indexOf(this.state.chosenPhoto) === 0} onClick={this.handlePrevPhoto}>P</PrevButton>
              <NextButton disabled={photosByAlbum.indexOf(this.state.chosenPhoto) === photosByAlbum.length - 1} onClick={this.handleNextPhoto}>N</NextButton>
            </PhotosGalleryWrapper>
          </Popup>
        ) : (
          ""
        )}
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    photosByAlbum: getPhotosByAlbum(state, props.albumId),
  };
};

export default connect(mapStateToProps, null)(Photos);
