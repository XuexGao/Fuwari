---
title: "How to split websites? Global launch! A little trouble, but fun!"
description: "The process of website redirection can be challenging, and it’s not straightforward at all. If you are interested in exploring this technology (particularly for the purpose of site relocation), we encourage you to give it a try – [8!]."
published: 2026-01-12
image: ../../assets/images/fenliu.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# The website requires segmentation.
Blog core, main site
https://blog.acofork.com/
Umami, used for embedding a JavaScript function on the website to track visitors and display visitor information.
https://umami.acofork.com/share/CdkXbGgZr6ECKOyK
Static image for top banner and entire website background.
https://pic1.acofork.com/

Okay, please provide the text. I’m ready when you are.
Okay, please provide the text you would like me to translate. I’m ready when you are.
These are being redirected to https://blog.acofork.com, and we need to configure the routing for it.

# Here’s the translation:  Each CDN SSL application solution.

### EdgeOne

由于NS直接在EdgeOne，故直接申请
![](../../assets/images/fenliu-1.webp)
### ESA
使用DCV委派
![](../../assets/images/fenliu-2.webp)
### Cloudflare
使用HTTP验证，由于ACME验证节点在国外，所以它只会看到CNAME到Cloudflare的记录，从而签发SSL
![](../../assets/images/fenliu-3.webp)
针对重定向的域名，由于默认所有请求都会被重定向到新域，ACME自然无法验证，所以我们需要写一条排除规则，让ACME验证路径直接返回200 OK，其余的路径再重定向
![](../../assets/images/fenliu-17.webp)

# Please provide the text you would like me to translate.

### Static type

国内使用对应CDN的Page业务，海外使用Cloudflare Worker。至于为什么不将 `blog.acofork.com` 也放在EdgeOne Page，一是因为EdgeOne CDN和Page的WAF规则是分开的，而Page业务的WAF规则不是很好做海外封锁，二是因为EO在之前被打的时候将这个子域封了。而ESA Page可以很简单做到海外封禁
![](../../assets/images/fenliu-4.webp)

![](../../assets/images/fenliu-5.webp)

![](../../assets/images/fenliu-16.webp)
### 动态型

国内使用IPv6回源（用户 - IPv4 - EO/ESA CDN - IPv6 - 源站）。至于为什么不用ESA，是因为ESA CDN回源非标端口需要像Cloudflare一样写一条回源规则，占用免费规则集5条中的其中之一
![](../../assets/images/fenliu-6.webp)
海外采用Cloudflare Tunnel（用户 - IPv4 - CF CDN - 内部连接 - 源站）
![](../../assets/images/fenliu-7.webp)

# Browser client implementation of session monitoring.

利用浏览器JavaScript发送HEAD请求拿取对端响应头Server字段并回显（若跨域则需要设置 **Access-Control-Expose-Headers** 响应头，值为 **server**
![](../../assets/images/fenliu-12.webp)

![](../../assets/images/ae6f93ce318fa428e94256c2b4a501e1.webp)

# Okay, please provide the text. I’m ready when you are.

- ESA Page对超多资源和大文件支持很差。例如静态随机图项目无法部署到ESA Page（超出了2000个静态资产）
- ESA CDN针对于回源非标端口和Cloudflare一样要通过写回源规则实现，很浪费规则，推荐使用EdgeOne CDN，可以随意指定回源端口
![](../../assets/images/fenliu-8.webp)
- 如果你要做分流业务，必须将域名NS托管在国内的DNS解析服务商，因为Cloudflare不支持域名分流解析，并且请将默认解析给CF，将境内解析给国内节点，不要反着来
![](../../assets/images/fenliu-9.webp)
- 分流的原理是DNS看查询的源IP，如果是国内则返回国内节点，海外则返回海外。也就是说你的出口IP决定访问的节点，若你开梯子（如美国），就算你在国内，访问到的也是海外节点
- DCV委派只能写一条，如果你的NS在EO，可以写DCV给ESA，而Cloudflare使用HTTP验证，这一切都将是一劳永逸，全自动化的
- Cloudflare SaaS 在接入外部域名时，非常建议选择 HTTP验证来签发SSL，下文会详细说明该验证模式的好处。我们都知道，Cloudflare SaaS 在创建的时候，对于申请SSL默认选项是 TXT验证，但是该方式并不好，我们都知道，使用TXT验证的确可以签发证书，但在3月后（上一个SSL证书过期后），我们需要及时更新TXT记录来重新申领新的SSL证书，但是HTTP验证就不是这样了，Cloudflare CDN会自动在边缘节点放上HTTP验证的文件，并且Cloudflare可以随时更改，这样，你就不需要在申领新SSL的时候做任何事情了，一切都由Cloudflare自动实现
- Cloudflare SaaS接入外部域名后，对于该外部域名是可以享有所有Cloudflare单域名下服务（也包括Cloudflare Worker，参见： [Cloudflare Worker 优选](/posts/cf-fastip/#%E9%92%88%E5%AF%B9%E4%BA%8Ecloudflare-workers/)）。也可以配置规则等业务，你最终访问的是哪个域名就写哪个主机名，不要写回退源的主机名，除非你想让该规则仅在直接访问回退源时生效
![](../../assets/images/fenliu-11.webp)

![](../../assets/images/fenliu-10.webp)
- Cloudflare Tunnel实际上是可以自定义生效的域名的，并非仅局限于账户内域名（虽然你在控制台看着是这样），我们可以通过抓包更改请求体来实现各种各样的域名，它没有验证，详见：[Cloudflare Tunnel 优选](/posts/cf-fastip/#%E9%92%88%E5%AF%B9%E4%BA%8Ecloudflare-tunnelzerotrust/)
![](../../assets/images/fenliu-13.webp)
- 分流做完后，一定要针对国内节点启用封锁海外模式，这能大大降低被DDoS致使CDN商给你域名取消接入的概率。Cloudflare随你，因为打不死，如果你的源站Hold不住，也请配置点策略。因为刷子（DDoS发起者可以通过强行绑定域名和IP来通过便宜量大的海外IP来攻击你脆弱的国内节点，如果什么防护都不做，很可能被刷几个TB的异常流量然后被CDN取消接入）
![](../../assets/images/fenliu-14.webp)

![](../../assets/images/fenliu-15.webp)
# 成果展示

### Blog core

![](../../assets/images/https___blogacoforkcom__多地区多线路HTTP测速(1).webp)
### Umami
![](../../assets/images/https___umamiacoforkcom__多地区多线路HTTP测速.webp)
### 随机图
![](../../assets/images/https___picacoforkcom__多地区多线路HTTP测速.webp)