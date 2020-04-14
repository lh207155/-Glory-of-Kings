module.exports = (app) => {
  const router = require("express").Router();
  const mongoose = require("mongoose");
  const Article = require("../../models/Article");
  const Category = require("../../models/Category");
  // const Article = mongoose.model("Article");
  // const Category = mongoose.model("Category");
  router.get("/article/init", async (req, res) => {
    const parent = await Category.findOne({
      name: "新闻分类",
    });
    const Cats = await Category.find()
      .where({
        parent: parent,
      })
      .lean();
    // res.send(Cats);
    const newsList = [
      "吕布-天魔缭乱翻新曝光，霸气风范，魔王归来！",
      "体验服爆料丨廉颇未老，尚能战斗！老将廉颇重返巅峰",
      "新皮肤爆料丨拔刀斩恶魂！橘右京新装登场~",
      "豪横！王者荣耀英雄主打歌完整歌单霸气登陆酷狗！",
      "蔡文姬繁星吟游皮肤，史诗升级进行时！",
      "4月5日开服及奖励通知",
      "4月11日体验服停机更新公告",
      "QQ消息同步功能介绍及问题说明",
      "4月9日体验服不停机更新公告",
      "4月8日净化游戏环境声明及处罚公告",
      "橘右京全新史诗皮肤上架 SNK皮肤齐聚峡谷福利大放送",
      "【预告】荣耀中国节·轻风戏纸鸢，参与必得纸鸢回城特效（永久）",
      "参与“S19战令集结号”，赢80级直升经验大礼",
      "【镜界诞生 见证觉醒】活动公告",
      "S19赛季来临 多重好礼邀你开启全新赛季",
      "《一招即浪》第二期：逆天牛魔王最浪打法，城市赛教你一招制敌",
      "为战队争夺荣誉！城市联赛战队赛通道报名开启！",
      "高校联赛分站赛即将打响 今年又有多少好玩的活动值得期待？",
      "《一招即浪》第一期：白起强势归来，教你如何化身“边路杀神”",
      "KPL王者荣耀职业联赛4月4日比赛停赛公告",
    ];
    const newsListTitle = newsList.map((title) => {
      const randomCats = Cats.slice(0).sort((a, b) => Math.random() - 0.5);
      return {
        title: title,
        categories: randomCats.slice(0, 2),
      };
    });

    await Article.deleteMany({});
    await Article.insertMany(newsListTitle);
    res.send({ newsListTitle });
  });
  router.get("/news/list", async (req, res) => {
    const parent = await Category.findOne({
      name: "新闻分类",
    });
    const docs = await Category.aggregate([
      {
        $match: {
          parent: parent._id,
        },
      },
      {
        $lookup: {
          from: "articles",
          localField: "_id",
          foreignField: "categories",
          as: "newsList",
        },
      },
      {
        $addFields: {
          newsList: { $slice: ["$newsList", 5] },
        },
      },
    ]);
    const subCats = docs.map((v) => {
      return v._id;
    });
    docs.unshift({
      name: "热门",
      newsList: await Article.find({
        categories: { $in: subCats },
      })
        .populate("categories")
        .limit(5)
        .lean(),
    });
    docs.map((cat) => {
      cat.newsList.map((news) => {
        news.cateName =
          cat.name === "热门" ? news.categories[0].name : cat.name;

        // return news;
      });
      // return cat;
    });
    res.send(docs);
  });
  app.use("/web/api", router);
};
