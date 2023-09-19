/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */

const qCategory = [];
const qRather = [];
const qCustomer = [];
const qPhoto = [];
const qVideo = [];
const qDesign = [];
const qIllustration = [];
const qPdf = [];
const q3d = [];

export function buildTestData(originalData, tag) {
  const dataMap = {
    'q-category': qCategory,
    'q-rather': qRather,
    'q-customer': qCustomer,
    'q-photo': qPhoto,
    'q-video': qVideo,
    'q-design': qDesign,
    'q-illustration': qIllustration,
    'q-pdf': qPdf,
    'q-3d': q3d,
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(dataMap)) {
    originalData[key].data.forEach((element) => {
      if (key === 'q-category') {
        value.push(element.title.trim());
      } else {
        value.push(element.text.trim());
      }
    });
  }

  const answers = [];

  const functionMap = {
    '@quiz single template': buildSingleTemplateData,
    '@quiz double template': buildDoubleTemplateData,
    '@quiz triple template': buildTripleTemplateData,
    '@quiz single flagship photo': buildSingleFlagshipPhotoData,
    '@quiz single flagship video': buildSingleFlagshipVideoData,
    '@quiz single flagship design': buildSingleFlagshipDesignData,
    '@quiz single flagship illustration': buildSinglFlagshipIllustrationData,
    '@quiz single flagship pdf': buildSingleFlagshipPdfData,
    '@quiz double flagship photo video': buildDoubleFlagshipPhotoVideoData,
    '@quiz double flagship photo design': buildDoubleFlagshipPhotoDesignData,
    '@quiz double flagship photo illustration': buildDoubleFlagshipPhotoIllustrationData,
    '@quiz double flagship photo pdf': buildDoubleFlagshipPhotoPDFData,
    '@quiz double flagship video design': buildDoubleFlagshipVideoDesignData,
    '@quiz double flagship video illustration': buildDoubleFlagshipVideoIllustrationData,
    '@quiz double flagship video pdf': buildDoubleFlagshipVideoPDFData,
    '@quiz double flagship design illustration': buildDoubleFlagshipDesignIllustrationData,
    '@quiz double flagship design pdf': buildDoubleFlagshipDesignPDFData,
    '@quiz double flagship illustration pdf': buildDoubleFlagshipIllustrationPDFData,
    '@quiz triple flagship photo video design': buildTripleFlagshipPhotoVideoDesignData,
    '@quiz triple flagship photo video illustration': buildTripleFlagshipPhotoVideoIllustrationData,
    '@quiz triple flagship photo video pdf': buildTripleFlagshipPhotoVideoPDFData,
    '@quiz triple flagship video design illustration': buildTripleFlagshipVideoDesignIllustrationData,
    '@quiz triple flagship video design pdf': buildTripleFlagshipVideoDesignPDFData,
    '@quiz triple flagship design illustration pdf': buildTripleFlagshipDesignIllustrationPDFData,
    '@quiz single 3D': buildSingle3dData,
    '@quiz double 3D': buildDouble3dData,
    '@quiz triple 3D': buildTriple3dData,
  };

  functionMap[tag](answers);

  return answers;
}

function buildSingle3dData(answers) {
  qCategory.forEach((category) => {
    qCustomer.forEach((customer) => {
      if (category === '3D/AR') {
        q3d.forEach((item) => {
          const key = `${category} > ${item} > ${customer}`;
          answers.push(key);
        });
      }
    });
  });
}

function buildDouble3dData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    qCustomer.forEach((customer) => {
      if (qCategory[i] === 'Photography') {
        qPhoto.forEach((photo) => {
          q3d.forEach((item) => {
            const key = `${qCategory[i]} + ${
              qCategory[qCategory.length - 1]
            } > ${photo} > ${item} > ${customer}`;
            answers.push(key);
          });
        });
      }

      if (qCategory[i] === 'Video') {
        qVideo.forEach((video) => {
          q3d.forEach((item) => {
            const key = `${qCategory[i]} + ${
              qCategory[qCategory.length - 1]
            } > ${video} > ${item} > ${customer}`;
            answers.push(key);
          });
        });
      }

      if (qCategory[i] === 'Graphic design') {
        qDesign.forEach((design) => {
          q3d.forEach((item) => {
            const key = `${qCategory[i]} + ${
              qCategory[qCategory.length - 1]
            } > ${design} > ${item} > ${customer}`;
            answers.push(key);
          });
        });
      }

      if (qCategory[i] === 'Illustration') {
        qIllustration.forEach((illustration) => {
          q3d.forEach((item) => {
            const key = `${qCategory[i]} + ${
              qCategory[qCategory.length - 1]
            } > ${illustration} > ${item} > ${customer}`;
            answers.push(key);
          });
        });
      }

      if (qCategory[i] === 'PDFs') {
        qPdf.forEach((pdf) => {
          q3d.forEach((item) => {
            const key = `${qCategory[i]} + ${
              qCategory[qCategory.length - 1]
            } > ${pdf} > ${item} > ${customer}`;
            answers.push(key);
          });
        });
      }
    });
  }
}

function buildTriple3dData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i; j < qCategory.length - 1; j += 1) {
      qCustomer.forEach((customer) => {
        if (qCategory[i] === 'Photography' && qCategory[j] === 'Video') {
          qPhoto.forEach((photo) => {
            qVideo.forEach((video) => {
              q3d.forEach((item) => {
                const key = `${qCategory[i]} + ${qCategory[j]} + ${
                  qCategory[qCategory.length - 1]
                } > ${photo} > ${video} > ${item} > ${customer}`;
                answers.push(key);
              });
            });
          });
        }
      });
    }
  }
}

function buildSingleFlagshipPdfData(answers) {
  qCategory.forEach((category) => {
    qCustomer.forEach((customer) => {
      if (category === 'PDFs') {
        qPdf.forEach((pdf) => {
          const key = `${category} > ${qRather[1]} > ${pdf} > ${customer}`;
          answers.push(key);
        });
      }
    });
  });
}

function buildSinglFlagshipIllustrationData(answers) {
  qCategory.forEach((category) => {
    qCustomer.forEach((customer) => {
      if (category === 'Illustration') {
        qIllustration.forEach((illustration) => {
          const key = `${category} > ${qRather[1]} > ${illustration} > ${customer}`;
          answers.push(key);
        });
      }
    });
  });
}

function buildSingleFlagshipDesignData(answers) {
  qCategory.forEach((category) => {
    qCustomer.forEach((customer) => {
      if (category === 'Graphic design') {
        qDesign.forEach((design) => {
          const key = `${category} > ${qRather[1]} > ${design} > ${customer}`;
          answers.push(key);
        });
      }
    });
  });
}

function buildSingleFlagshipVideoData(answers) {
  qCategory.forEach((category) => {
    qCustomer.forEach((customer) => {
      if (category === 'Video') {
        qVideo.forEach((video) => {
          const key = `${category} > ${qRather[1]} > ${video} > ${customer}`;
          answers.push(key);
        });
      }
    });
  });
}

function buildSingleFlagshipPhotoData(answers) {
  qCategory.forEach((category) => {
    qCustomer.forEach((customer) => {
      if (category === 'Photography') {
        qPhoto.forEach((photo) => {
          const key = `${category} > ${qRather[1]} > ${photo} > ${customer}`;
          answers.push(key);
        });
      }
    });
  });
}

function buildTripleTemplateData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      for (let k = j + 1; k < qCategory.length - 1; k += 1) {
        qCustomer.forEach((customer) => {
          const key = `${qCategory[i]} + ${qCategory[j]} + ${qCategory[k]} > ${qRather[0]} > ${customer}`;
          answers.push(key);
        });
      }
    }
  }
}

function buildDoubleTemplateData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      qCustomer.forEach((customer) => {
        const key = `${qCategory[i]} + ${qCategory[j]} > ${qRather[0]} > ${customer}`;
        answers.push(key);
      });
    }
  }
}

function buildSingleTemplateData(answers) {
  qCategory.forEach((category) => {
    qCustomer.forEach((customer) => {
      if (category !== '3D/AR') {
        const key = `${category} > ${qRather[0]} > ${customer}`;
        answers.push(key);
      }
    });
  });
}

// Photography & Video > Take the time to control every detail >
// Get them sorted and organized > Create, edit, and share on social >
// A student or teacher discount
function buildDoubleFlagshipPhotoVideoData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      qCustomer.forEach((customer) => {
        if (qCategory[i] === 'Photography' && qCategory[j] === 'Video') {
          qPhoto.forEach((photo) => {
            qVideo.forEach((video) => {
              const key = `${qCategory[i]} + ${qCategory[j]} > ${qRather[1]} > ${photo} > ${video} > ${customer}`;
              answers.push(key);
            });
          });
        }
      });
    }
  }
}

// Photography & Graphic design > Take the time to control every detail >
// Get them sorted and organized > Create layouts for magazines, books, or posters >
// A student or teacher discount
function buildDoubleFlagshipPhotoDesignData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      qCustomer.forEach((customer) => {
        if (
          qCategory[i] === 'Photography'
          && qCategory[j] === 'Graphic design'
        ) {
          qPhoto.forEach((photo) => {
            qDesign.forEach((design) => {
              const key = `${qCategory[i]} + ${qCategory[j]} > ${qRather[1]} > ${photo} > ${design} > ${customer}`;
              answers.push(key);
            });
          });
        }
      });
    }
  }
}

function buildDoubleFlagshipPhotoIllustrationData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      qCustomer.forEach((customer) => {
        if (qCategory[i] === 'Photography' && qCategory[j] === 'Illustration') {
          qPhoto.forEach((photo) => {
            qIllustration.forEach((illustration) => {
              const key = `${qCategory[i]} + ${qCategory[j]} > ${qRather[1]} > ${photo} > ${illustration} > ${customer}`;
              answers.push(key);
            });
          });
        }
      });
    }
  }
}

function buildDoubleFlagshipPhotoPDFData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      qCustomer.forEach((customer) => {
        if (qCategory[i] === 'Photography' && qCategory[j] === 'PDFs') {
          qPhoto.forEach((photo) => {
            qPdf.forEach((pdf) => {
              const key = `${qCategory[i]} + ${qCategory[j]} > ${qRather[1]} > ${photo} > ${pdf} > ${customer}`;
              answers.push(key);
            });
          });
        }
      });
    }
  }
}

function buildDoubleFlagshipVideoDesignData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      qCustomer.forEach((customer) => {
        if (qCategory[i] === 'Video' && qCategory[j] === 'Graphic design') {
          qVideo.forEach((video) => {
            qDesign.forEach((design) => {
              const key = `${qCategory[i]} + ${qCategory[j]} > ${qRather[1]} > ${video} > ${design} > ${customer}`;
              answers.push(key);
            });
          });
        }
      });
    }
  }
}

function buildDoubleFlagshipVideoIllustrationData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      qCustomer.forEach((customer) => {
        if (qCategory[i] === 'Video' && qCategory[j] === 'Illustration') {
          qVideo.forEach((video) => {
            qIllustration.forEach((illustration) => {
              const key = `${qCategory[i]} + ${qCategory[j]} > ${qRather[1]} > ${video} > ${illustration} > ${customer}`;
              answers.push(key);
            });
          });
        }
      });
    }
  }
}

function buildDoubleFlagshipVideoPDFData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      qCustomer.forEach((customer) => {
        if (qCategory[i] === 'Video' && qCategory[j] === 'PDFs') {
          qVideo.forEach((video) => {
            qPdf.forEach((pdf) => {
              const key = `${qCategory[i]} + ${qCategory[j]} > ${qRather[1]} > ${video} > ${pdf} > ${customer}`;
              answers.push(key);
            });
          });
        }
      });
    }
  }
}

function buildDoubleFlagshipDesignIllustrationData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      qCustomer.forEach((customer) => {
        if (
          qCategory[i] === 'Graphic design'
          && qCategory[j] === 'Illustration'
        ) {
          qDesign.forEach((design) => {
            qIllustration.forEach((illustration) => {
              const key = `${qCategory[i]} + ${qCategory[j]} > ${qRather[1]} > ${design} > ${illustration} > ${customer}`;
              answers.push(key);
            });
          });
        }
      });
    }
  }
}

function buildDoubleFlagshipDesignPDFData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      qCustomer.forEach((customer) => {
        if (qCategory[i] === 'Graphic design' && qCategory[j] === 'PDFs') {
          qDesign.forEach((design) => {
            qPdf.forEach((pdf) => {
              const key = `${qCategory[i]} + ${qCategory[j]} > ${qRather[1]} > ${design} > ${pdf} > ${customer}`;
              answers.push(key);
            });
          });
        }
      });
    }
  }
}

function buildDoubleFlagshipIllustrationPDFData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      qCustomer.forEach((customer) => {
        if (qCategory[i] === 'Illustration' && qCategory[j] === 'PDFs') {
          qIllustration.forEach((illustration) => {
            qPdf.forEach((pdf) => {
              const key = `${qCategory[i]} + ${qCategory[j]} > ${qRather[1]} > ${illustration} > ${pdf} > ${customer}`;
              answers.push(key);
            });
          });
        }
      });
    }
  }
}

function buildTripleFlagshipPhotoVideoDesignData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      for (let k = j + 1; k < qCategory.length - 1; k += 1) {
        qCustomer.forEach((customer) => {
          if (
            qCategory[i] === 'Photography'
            && qCategory[j] === 'Video'
            && qCategory[k] === 'Graphic design'
          ) {
            qPhoto.forEach((photo) => {
              qVideo.forEach((video) => {
                qDesign.forEach((design) => {
                  const key = `${qCategory[i]} + ${qCategory[j]} + ${qCategory[k]} > ${qRather[1]} > ${photo} > ${video} > ${design} > ${customer}`;
                  answers.push(key);
                });
              });
            });
          }
        });
      }
    }
  }
}

function buildTripleFlagshipPhotoVideoIllustrationData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      for (let k = j + 1; k < qCategory.length - 1; k += 1) {
        qCustomer.forEach((customer) => {
          if (
            qCategory[i] === 'Photography'
            && qCategory[j] === 'Video'
            && qCategory[k] === 'Illustration'
          ) {
            qPhoto.forEach((photo) => {
              qVideo.forEach((video) => {
                qIllustration.forEach((illustration) => {
                  const key = `${qCategory[i]} + ${qCategory[j]} + ${qCategory[k]} > ${qRather[1]} > ${photo} > ${video} > ${illustration} > ${customer}`;
                  answers.push(key);
                });
              });
            });
          }
        });
      }
    }
  }
}

function buildTripleFlagshipPhotoVideoPDFData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      for (let k = j + 1; k < qCategory.length - 1; k += 1) {
        qCustomer.forEach((customer) => {
          if (
            qCategory[i] === 'Photography'
            && qCategory[j] === 'Video'
            && qCategory[k] === 'PDFs'
          ) {
            qPhoto.forEach((photo) => {
              qVideo.forEach((video) => {
                qPdf.forEach((pdf) => {
                  const key = `${qCategory[i]} + ${qCategory[j]} + ${qCategory[k]} > ${qRather[1]} > ${photo} > ${video} > ${pdf} > ${customer}`;
                  answers.push(key);
                });
              });
            });
          }
        });
      }
    }
  }
}

function buildTripleFlagshipVideoDesignIllustrationData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      for (let k = j + 1; k < qCategory.length - 1; k += 1) {
        qCustomer.forEach((customer) => {
          if (
            qCategory[i] === 'Video'
            && qCategory[j] === 'Graphic design'
            && qCategory[k] === 'Illustration'
          ) {
            qVideo.forEach((video) => {
              qDesign.forEach((design) => {
                qIllustration.forEach((illustration) => {
                  const key = `${qCategory[i]} + ${qCategory[j]} + ${qCategory[k]} > ${qRather[1]} > ${video} > ${design} > ${illustration} > ${customer}`;
                  answers.push(key);
                });
              });
            });
          }
        });
      }
    }
  }
}

function buildTripleFlagshipVideoDesignPDFData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      for (let k = j + 1; k < qCategory.length - 1; k += 1) {
        qCustomer.forEach((customer) => {
          if (
            qCategory[i] === 'Video'
            && qCategory[j] === 'Graphic design'
            && qCategory[k] === 'PDFs'
          ) {
            qVideo.forEach((video) => {
              qDesign.forEach((design) => {
                qPdf.forEach((pdf) => {
                  const key = `${qCategory[i]} + ${qCategory[j]} + ${qCategory[k]} > ${qRather[1]} > ${video} > ${design} > ${pdf} > ${customer}`;
                  answers.push(key);
                });
              });
            });
          }
        });
      }
    }
  }
}

function buildTripleFlagshipDesignIllustrationPDFData(answers) {
  for (let i = 0; i < qCategory.length - 1; i += 1) {
    for (let j = i + 1; j < qCategory.length - 1; j += 1) {
      for (let k = j + 1; k < qCategory.length - 1; k += 1) {
        qCustomer.forEach((customer) => {
          if (
            qCategory[i] === 'Graphic design'
            && qCategory[j] === 'Illustration'
            && qCategory[k] === 'PDFs'
          ) {
            qDesign.forEach((design) => {
              qIllustration.forEach((illustration) => {
                qPdf.forEach((pdf) => {
                  const key = `${qCategory[i]} + ${qCategory[j]} + ${qCategory[k]} > ${qRather[1]} > ${design} > ${illustration} > ${pdf} > ${customer}`;
                  answers.push(key);
                });
              });
            });
          }
        });
      }
    }
  }
}
