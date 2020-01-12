import scrapy
import re
import json

actorDict = {};
jsonData = [];

class QuotesSpider(scrapy.Spider):
    name = "quotes"

    def closed(self, reason):
        self.generateJSON()

    def start_requests(self):
        urls = [
            'https://www.imdb.com/chart/top/?ref_=nv_mv_250',
            'https://www.imdb.com/chart/toptv/?ref_=nv_tvv_250',
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        links = []
        for link in response.css('a::attr(href)').extract():
            if "/title/tt" in link:
                links.append(link+'fullcredits')

        for href in links:  #links[:100]
            yield response.follow(href, self.parse_actors)

    def parse_actors(self, response):
        title = response.xpath('//a[contains(@itemprop,"url")]/text()').get()
        header = response.xpath('//h4[contains(@class,"dataHeaderWithBorder")]/text()').get()
        actorNames = response.xpath('//table[@class="cast_list"]//a[contains(@href,"/name/nm")]/text()').getall()
        isMovie = True
        if "Series" in header:
            isMovie = False

        for actor in actorNames:
            global actorDict;
            if actor in actorDict:
                if isMovie:
                    actorDict[actor]["movies"].append(title)
                else:
                    actorDict[actor]["series"].append(title)
            else:
                if isMovie:
                    newActor = {
                      "name": actor,
                      "movies": [title],
                      "series": []
                    }
                else:
                    newActor = {
                      "name": actor,
                      "movies": [],
                      "series": [title]
                    }
                actorDict[actor] = newActor;

    def generateJSON(self):
        global actorDict;
        jsonf = open('castJson.json', 'w');
        jsonf.truncate(0)
        for actor in actorDict.items():
            jsonData.append(actor[1])
        json.dump(jsonData, jsonf);
        jsonf.close();
# scrapy crawl quotes
