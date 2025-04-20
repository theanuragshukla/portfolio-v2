const Blog = require("../../models/Blog");

const filterBlogs = async ({ query, page = 1, limit = 20 }) => {
	try {
		const mLimit = limit;
		const mPage = page;
		const pipeline = [];

		if (query) {
			const sanitizedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			const regex = new RegExp(sanitizedQuery, "i");

			pipeline.push({
				$match: {
					$or: [
						{ title: { $regex: regex } },
						{ desc: { $regex: regex } },
						{ tags: { $elemMatch: { $regex: regex } } },
					],
				},
			});

			pipeline.push({
				$addFields: {
					score: {
						$add: [
							{ $cond: [{ $regexMatch: { input: "$title", regex } }, 3, 0] },
							{ $cond: [{ $regexMatch: { input: "$desc", regex } }, 2, 0] },
							{
								$cond: [
									{
										$anyElementTrue: {
											$map: {
												input: "$tags",
												as: "tag",
												in: { $regexMatch: { input: "$$tag", regex } },
											},
										},
									},
									5,
									0,
								],
							},
						],
					},
				},
			});
		}

		const total = await Blog.countDocuments(pipeline[0]?.$match || {});
		pipeline.push(
			{ $sort: { score: -1, createdAt: -1 } },
			{ $skip: (mPage - 1) * mLimit },
			{ $limit: mLimit },
			{
				$project: {
					_id: 0,
					uid: 1,
					title: 1,
					desc: 1,
					tags: 1,
					img: 1,
					updatedAt: 1,
				},
			}
		);

		const hasNext = total > mLimit * mPage;
		const blogs = await Blog.aggregate(pipeline);

		return {
			status: true,
			data: blogs,
			hasNext,
		};
	} catch (e) {
		console.error("Error in filterBlogs:", e);
		return {
			status: false,
			msg: e.message || "Unexpected server error",
		};
	}
};

module.exports = { filterBlogs };
