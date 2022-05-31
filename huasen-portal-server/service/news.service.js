/*
 * @Autor: huasenjio
 * @Date: 2021-10-27 22:31:13
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-04-23 23:07:27
 * @Description: 
 */
const News = require("../db/model/news.js")
const RESPONSE = require("../utils/response-handle.js");
const TOKENER = require("../plugin/jwt.js");

function findAll(req, res, next) {
  // 解析token
  let token = req.headers.token
  News.find()
    .then((lists) => {
      TOKENER.verifyToken(token)
        .then((tokenInfo) => {
          let code = tokenInfo.data.code
          let tag = tokenInfo.data.tag
          if (tag == "admin") {
            // 若管理员则不限制
          } else {
            lists = lists.filter(item => {
              return item.code <= code && !item.isDraft
            })
          }
          res.send(RESPONSE("SUCCESS", "查询成功", lists));
        })
        .catch((err) => {
          lists = lists.filter(item => {
            return item.code == 0 && !item.isDraft
          })
          res.send(RESPONSE("SUCCESS", "查询成功", lists));
        });
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "查询出错", null, err));
    });
}
function findAllByPage(req, res, next) {
  let { pageId = 1, pageSize = 10 } = req.body;
  let token = req.headers.token
  // 跳过几条读几条
  News.find()
    .limit(Number(pageSize)) // 读几条
    .skip(Number(pageId - 1) * pageSize) // 跳几条
    .then((lists) => {
      News.find().countDocuments().then(countNum => {
        TOKENER.verifyToken(token)
          .then((tokenInfo) => {
            let code = tokenInfo.data.code
            let tag = tokenInfo.data.tag
            if (tag == "admin") {
              // 若管理员则不限制
            } else {
              lists = lists.filter(item => {
                return item.code <= code && !item.isDraft
              })
            }
            res.send(RESPONSE("SUCCESS", "查询成功", {
              lists,
              countNum
            }));
          })
          .catch((err) => {
            // 若token校验不通过，则仅返回权限最低且不为草稿的新闻
            lists = lists.filter(item => {
              return item.code == 0 && !item.isDraft
            })
            res.send(RESPONSE("SUCCESS", "查询成功", {
              lists,
              countNum
            }));
          });
      })
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "分页查询出错", null, err));
    });
}
function findById(req, res, next) {
  let { _id } = req.body
  let token = req.headers.token
  News.find({ _id }).then(lists => {
    TOKENER.verifyToken(token)
      .then((tokenInfo) => {
        let code = tokenInfo.data.code
        let tag = tokenInfo.data.tag
        if (tag == "admin") {
          // 若管理员则不限制
        } else {
          lists = lists.filter(item => {
            return item.code <= code && !item.isDraft
          })
        }
        res.send(RESPONSE("SUCCESS", "查询成功", lists));
      })
      .catch((err) => {
        lists = lists.filter(item => {
          return item.code == 0 && !item.isDraft
        })
        res.send(RESPONSE("SUCCESS", "查询成功", lists));
      });
  }).catch(err => {
    res.send(RESPONSE("ERROR", "查询出错", null, err));
  })
}
function deleteById(req, res, next) {
  let { _id } = req.body;
  News.deleteOne({ _id })
    .then((result) => {
      res.send(RESPONSE("SUCCESS", "删除成功", result));
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "删除出错", null, err));
    });
}
function updateById(req, res, next) {
  let { _id, ...data } = req.body;
  News.updateOne({ _id }, { $set: data })
    .then((result) => {
      res.send(RESPONSE("SUCCESS", "更新成功", result));
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "更新出错", null, err));
    });
}
function insert(req, res, next) {
  let data = req.body;
  News.insertMany(data)
    .then((lists) => {
      res.send(RESPONSE("SUCCESS", "添加成功", lists));
    })
    .catch((err) => {
      res.send(RESPONSE("ERROR", "添加出错", null, err));
    });
}

function findNewsByTitleOrTagKey(req, res, next) {
  let { titleKey, publisherKey } = req.body;
  let regTitleKey = new RegExp(titleKey)
  let regPublisherKey = new RegExp(publisherKey)
  News.find({ $and: [{ title: { $regex: regTitleKey } }, { publisher: { $regex: regPublisherKey } }] }).then(lists => {
    res.send(RESPONSE("SUCCESS", "模糊查询成功", lists));
  }).catch(err => {
    res.send(RESPONSE("ERROR", "模糊查询出错", null, err));
  })
}

module.exports = {
  findAll,
  findAllByPage,
  deleteById,
  updateById,
  insert,
  findNewsByTitleOrTagKey,
  findById
}