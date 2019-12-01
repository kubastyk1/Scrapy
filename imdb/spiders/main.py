import scrapy
import re

actorDict = {}

class QuotesSpider(scrapy.Spider):
    name = "quotes"

    def start_requests(self):
        urls = [
            'https://www.imdb.com/chart/top/?ref_=nv_mv_250',
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        links = []
        for link in response.css('a::attr(href)').extract():
            if "/title/tt" in link:
                links.append(link)

        for href in links:
            yield response.follow(href, self.parse_actors)

    def parse_actors(self, response):
        actorNames = response.xpath('//div[@id="titleCast"]//a/text()').getall()
        for actor in actorNames[1:-5:2]:
            global actorDict
            self.log(actorDict)

            if actor in actorDict:
                actorDict[actor] += 1
            else:
                actorDict[actor] = 1

# scrapy crawl quotes
