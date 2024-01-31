---
title: uibot 中级认证实操题
tags:
  - uibot
categories:
  - 运维
abbrlink: 2759400685
date: 2021-08-18 16:51:42
---

```

Dim objExcelWorkBook = ""
Dim bRet = ""
Dim arrayData = ""
Dim dRet = ""
Dim temp = ""
Dim iRet = ""
Dim sRet = ""
Dim dTime = ""
Dim hWeb = ""
Rem 启动浏览器
hWeb = WebBrowser.Create("chrome","https://www.ctrip.com",30000,{"bContinueOnError":False,"iDelayAfter":300,"iDelayBefore":200,"sBrowserPath":"","sStartArgs":""})
dTime = Time.Now()
iRet = Time.ToUnixTime(dTime, False)
TracePrint(iRet)
iRet = iRet+86400
dRet = Time.FromUnixTime(iRet, False)
sRet = Time.Format(dRet,"yyyy-mm-dd")
TracePrint(sRet)
#icon("@res:6ipfq92h-skr5-4ep2-4579-mr35ueeprfm7.png")
Mouse.Action({"wnd":[{"cls":"Chrome_WidgetWin_1","title":"*","app":"chrome"},{"cls":"Chrome_RenderWidgetHostHWND","title":"Chrome Legacy Window"}],"html":[{"tag":"B","parentid":"searchBoxUl","idx":1}]},"left","click",10000,{"bContinueOnError":False,"iDelayAfter":300,"iDelayBefore":200,"bSetForeground":True,"sCursorPosition":"Center","iCursorOffsetX":0,"iCursorOffsetY":0,"sKeyModifiers":[],"sSimulate":"simulate","bMoveSmoothly":False})
#icon("@res:64v4kn8v-slhf-geod-g4e9-9uhi5rmsldcp.png")
Keyboard.InputText({"wnd":[{"cls":"Chrome_WidgetWin_1","title":"*","app":"chrome"},{"cls":"Chrome_RenderWidgetHostHWND","title":"Chrome Legacy Window"}],"html":[{"tag":"INPUT","id":"FD_StartCity"}]},"长沙",True,20,10000,{"bContinueOnError":False,"iDelayAfter":300,"iDelayBefore":500,"bSetForeground":True,"sSimulate":"message","bValidate":False,"bClickBeforeInput":False})
#icon("@res:9mosacgl-3jgf-tjlu-2h8k-q1tfjibco2d9.png")
Keyboard.InputText({"wnd":[{"cls":"Chrome_WidgetWin_1","title":"*","app":"chrome"},{"cls":"Chrome_RenderWidgetHostHWND","title":"Chrome Legacy Window"}],"html":[{"tag":"INPUT","id":"FD_DestCity"}]},"北京",True,20,10000,{"bContinueOnError":False,"iDelayAfter":300,"iDelayBefore":500,"bSetForeground":True,"sSimulate":"message","bValidate":False,"bClickBeforeInput":False})
#icon("@res:l0jocagj-nph5-ijuj-p55l-0erbqfvt9lid.png")
Keyboard.InputText({"wnd":[{"cls":"Chrome_WidgetWin_1","title":"*","app":"chrome"},{"cls":"Chrome_RenderWidgetHostHWND","title":"Chrome Legacy Window"}],"html":[{"tag":"INPUT","id":"FD_StartDate"}]},sRet,True,20,10000,{"bContinueOnError":False,"iDelayAfter":300,"iDelayBefore":500,"bSetForeground":True,"sSimulate":"message","bValidate":False,"bClickBeforeInput":False})
#icon("@res:0dj7ouhn-71a1-r384-vu81-j5p5uepdgjc9.png")
Mouse.Action({"wnd":[{"cls":"Chrome_WidgetWin_1","title":"*","app":"chrome"},{"cls":"Chrome_RenderWidgetHostHWND","title":"Chrome Legacy Window"}],"html":[{"tag":"A","id":"float_100_close"}]},"left","click",10000,{"bContinueOnError":False,"iDelayAfter":300,"iDelayBefore":200,"bSetForeground":True,"sCursorPosition":"Center","iCursorOffsetX":0,"iCursorOffsetY":0,"sKeyModifiers":[],"sSimulate":"simulate","bMoveSmoothly":False})
#icon("@res:7pgki1gr-pmlu-15c2-9rb6-m9av5el6jgsa.png")
Mouse.Action({"wnd":[{"cls":"Chrome_WidgetWin_1","title":"*","app":"chrome"},{"cls":"Chrome_RenderWidgetHostHWND","title":"Chrome Legacy Window"}],"html":[{"tag":"INPUT","id":"FD_StartSearch"}]},"left","click",10000,{"bContinueOnError":False,"iDelayAfter":300,"iDelayBefore":200,"bSetForeground":True,"sCursorPosition":"Center","iCursorOffsetX":0,"iCursorOffsetY":0,"sKeyModifiers":[],"sSimulate":"simulate","bMoveSmoothly":False})
Rem 判断是否有疫情紧急警告窗口，因为会影响下一步操作，有的话点击关闭弹窗
#icon("@res:ov5edeis-71u9-9p0q-sv0f-c2v74fd87lre.png")
bRet = UiElement.Exists({"wnd":[{"cls":"Chrome_WidgetWin_1","title":"*","app":"chrome"},{"cls":"Chrome_RenderWidgetHostHWND","title":"Chrome Legacy Window"}],"html":[{"tag":"DIV","parentid":"outerContainer","aaname":"紧急公告"}]},{"bContinueOnError":False,"iDelayAfter":300,"iDelayBefore":200})
TracePrint(bRet)
If bRet = True
	#icon("@res:nk3hmfj8-tcsj-iljj-ip8v-qo8888s7i6rh.png")
	Mouse.Action({"wnd":[{"cls":"Chrome_WidgetWin_1","title":"*","app":"chrome"},{"cls":"Chrome_RenderWidgetHostHWND","title":"Chrome Legacy Window"}],"html":[{"tag":"A","parentid":"outerContainer"}]},"left","click",10000,{"bContinueOnError":False,"iDelayAfter":300,"iDelayBefore":200,"bSetForeground":True,"sCursorPosition":"Center","iCursorOffsetX":0,"iCursorOffsetY":0,"sKeyModifiers":[],"sSimulate":"simulate","bMoveSmoothly":False})
Else

End If
Rem 使用数据抓取进行抓取
airline_names = UiElement.DataScrap({"html":[{"id":"app","tag":"DIV"}],"wnd":[{"app":"chrome","cls":"Chrome_WidgetWin_1","title":"*"},{"cls":"Chrome_RenderWidgetHostHWND","title":"Chrome Legacy Window"}]},{"Columns":[{"props":["text"],"selecors":[{"className":"main filter-v2 zelda_color smooth-v1","index":0,"prefix":"","tag":"div","value":"div.main.filter-v2.zelda_color.smooth-v1"},{"className":"body-wrapper  ","index":0,"prefix":">","tag":"div","value":"div.body-wrapper"},{"className":"result-wrapper","index":0,"prefix":">","tag":"div","value":"div.result-wrapper"},{"className":"flight-list root-flights","index":0,"prefix":">","tag":"div","value":"div.flight-list.root-flights"},{"className":"","index":0,"prefix":">","tag":"span","value":"span"},{"className":"","index":0,"prefix":">","tag":"div","value":"div"},{"index":0,"prefix":">","tag":"div","value":"div"},{"className":"flight-item domestic","index":0,"prefix":">","tag":"div","value":"div.flight-item.domestic"},{"className":"flight-box","index":0,"prefix":">","tag":"div","value":"div.flight-box"},{"className":"flight-row","index":0,"prefix":">","tag":"div","value":"div.flight-row"},{"className":"flight-airline","index":0,"prefix":">","tag":"div","value":"div.flight-airline"},{"className":"airline-name","index":0,"prefix":">","tag":"div","value":"div.airline-name"},{"className":"","index":0,"prefix":">","tag":"span","value":"span"}]}],"ExtractTable":0},{"objNextLinkElement":"","iMaxNumberOfPage":5,"iMaxNumberOfResult":-1,"iDelayBetweenMS":1000,"bContinueOnError":False})
airline_planes = UiElement.DataScrap({"html":[{"id":"app","tag":"DIV"}],"wnd":[{"app":"chrome","cls":"Chrome_WidgetWin_1","title":"*"},{"cls":"Chrome_RenderWidgetHostHWND","title":"Chrome Legacy Window"}]},{"Columns":[{"props":["text"],"selecors":[{"className":"main filter-v2 zelda_color smooth-v1","index":0,"prefix":"","tag":"div","value":"div.main.filter-v2.zelda_color.smooth-v1"},{"className":"body-wrapper  ","index":0,"prefix":">","tag":"div","value":"div.body-wrapper"},{"className":"result-wrapper","index":0,"prefix":">","tag":"div","value":"div.result-wrapper"},{"className":"flight-list root-flights","index":0,"prefix":">","tag":"div","value":"div.flight-list.root-flights"},{"className":"","index":0,"prefix":">","tag":"span","value":"span"},{"className":"","index":0,"prefix":">","tag":"div","value":"div"},{"index":0,"prefix":">","tag":"div","value":"div"},{"className":"flight-item domestic","index":0,"prefix":">","tag":"div","value":"div.flight-item.domestic"},{"className":"flight-box","index":0,"prefix":">","tag":"div","value":"div.flight-box"},{"className":"flight-row","index":0,"prefix":">","tag":"div","value":"div.flight-row"},{"className":"flight-airline","index":0,"prefix":">","tag":"div","value":"div.flight-airline"},{"className":"plane","index":0,"prefix":">","tag":"div","value":"div.plane"},{"className":"plane","index":0,"prefix":">","tag":"div","value":"div.plane"},{"className":"plane-No","index":0,"prefix":">","tag":"span","value":"span.plane-No"}]}],"ExtractTable":0},{"objNextLinkElement":"","iMaxNumberOfPage":5,"iMaxNumberOfResult":-1,"iDelayBetweenMS":1000,"bContinueOnError":False})
airline_start = UiElement.DataScrap({"html":[{"id":"app","tag":"DIV"}],"wnd":[{"app":"chrome","cls":"Chrome_WidgetWin_1","title":"*"},{"cls":"Chrome_RenderWidgetHostHWND","title":"Chrome Legacy Window"}]},{"Columns":[{"props":["text"],"selecors":[{"className":"main filter-v2 zelda_color smooth-v1","index":0,"prefix":"","tag":"div","value":"div.main.filter-v2.zelda_color.smooth-v1"},{"className":"body-wrapper  ","index":0,"prefix":">","tag":"div","value":"div.body-wrapper"},{"className":"result-wrapper","index":0,"prefix":">","tag":"div","value":"div.result-wrapper"},{"className":"flight-list root-flights","index":0,"prefix":">","tag":"div","value":"div.flight-list.root-flights"},{"className":"","index":0,"prefix":">","tag":"span","value":"span"},{"className":"","index":0,"prefix":">","tag":"div","value":"div"},{"index":0,"prefix":">","tag":"div","value":"div"},{"className":"flight-item domestic","index":0,"prefix":">","tag":"div","value":"div.flight-item.domestic"},{"className":"flight-box","index":0,"prefix":">","tag":"div","value":"div.flight-box"},{"className":"flight-row","index":0,"prefix":">","tag":"div","value":"div.flight-row"},{"className":"flight-detail","index":0,"prefix":">","tag":"div","value":"div.flight-detail"},{"className":"depart-box","index":0,"prefix":">","tag":"div","value":"div.depart-box"},{"className":"time","index":0,"prefix":">","tag":"div","value":"div.time"}]}],"ExtractTable":0},{"objNextLinkElement":"","iMaxNumberOfPage":5,"iMaxNumberOfResult":-1,"iDelayBetweenMS":1000,"bContinueOnError":False})
airline_end = UiElement.DataScrap({"html":[{"id":"app","tag":"DIV"}],"wnd":[{"app":"chrome","cls":"Chrome_WidgetWin_1","title":"*"},{"cls":"Chrome_RenderWidgetHostHWND","title":"Chrome Legacy Window"}]},{"Columns":[{"props":["text"],"selecors":[{"className":"main filter-v2 zelda_color smooth-v1","index":0,"prefix":"","tag":"div","value":"div.main.filter-v2.zelda_color.smooth-v1"},{"className":"body-wrapper  ","index":0,"prefix":">","tag":"div","value":"div.body-wrapper"},{"className":"result-wrapper","index":0,"prefix":">","tag":"div","value":"div.result-wrapper"},{"className":"flight-list root-flights","index":0,"prefix":">","tag":"div","value":"div.flight-list.root-flights"},{"className":"","index":0,"prefix":">","tag":"span","value":"span"},{"className":"","index":0,"prefix":">","tag":"div","value":"div"},{"index":0,"prefix":">","tag":"div","value":"div"},{"className":"flight-item domestic","index":0,"prefix":">","tag":"div","value":"div.flight-item.domestic"},{"className":"flight-box","index":0,"prefix":">","tag":"div","value":"div.flight-box"},{"className":"flight-row","index":0,"prefix":">","tag":"div","value":"div.flight-row"},{"className":"flight-detail","index":0,"prefix":">","tag":"div","value":"div.flight-detail"},{"className":"arrive-box","index":0,"prefix":">","tag":"div","value":"div.arrive-box"},{"className":"time","index":0,"prefix":">","tag":"div","value":"div.time"}]}],"ExtractTable":0},{"objNextLinkElement":"","iMaxNumberOfPage":5,"iMaxNumberOfResult":-1,"iDelayBetweenMS":1000,"bContinueOnError":False})
airline_price = UiElement.DataScrap({"html":[{"id":"app","tag":"DIV"}],"wnd":[{"app":"chrome","cls":"Chrome_WidgetWin_1","title":"*"},{"cls":"Chrome_RenderWidgetHostHWND","title":"Chrome Legacy Window"}]},{"Columns":[{"props":["text"],"selecors":[{"className":"main filter-v2 zelda_color smooth-v1","index":0,"prefix":"","tag":"div","value":"div.main.filter-v2.zelda_color.smooth-v1"},{"className":"body-wrapper  ","index":0,"prefix":">","tag":"div","value":"div.body-wrapper"},{"className":"result-wrapper","index":0,"prefix":">","tag":"div","value":"div.result-wrapper"},{"className":"flight-list root-flights","index":0,"prefix":">","tag":"div","value":"div.flight-list.root-flights"},{"className":"","index":0,"prefix":">","tag":"span","value":"span"},{"className":"","index":0,"prefix":">","tag":"div","value":"div"},{"index":0,"prefix":">","tag":"div","value":"div"},{"className":"flight-item domestic","index":0,"prefix":">","tag":"div","value":"div.flight-item.domestic"},{"className":"flight-box","index":0,"prefix":">","tag":"div","value":"div.flight-box"},{"className":"flight-operate","index":0,"prefix":">","tag":"div","value":"div.flight-operate"},{"className":"flight-price","index":0,"prefix":">","tag":"div","value":"div.flight-price"},{"className":"flight-price domestic-flight-price","index":0,"prefix":">","tag":"div","value":"div.flight-price.domestic-flight-price"},{"className":"price over-size ","index":0,"prefix":">","tag":"div","value":"div.price.over-size"},{"className":"price","index":0,"prefix":">","tag":"span","value":"span.price"}]}],"ExtractTable":0},{"objNextLinkElement":"","iMaxNumberOfPage":5,"iMaxNumberOfResult":-1,"iDelayBetweenMS":1000,"bContinueOnError":False})
App.Kill("chrome.exe")
Rem Excel的版本会影响打开方式，因此预先创建好excel文件，然后打开它
objExcelWorkBook = Excel.OpenExcel("C:\\Users\\celar\\Desktop\\uibot中级考试-刘俊洋\\中级考试\\list.xlsx",True,"Excel","","")
Excel.WriteRange(objExcelWorkBook,"Sheet1","B1",airline_names)
Excel.WriteRange(objExcelWorkBook,"Sheet1","C1",airline_planes)
Excel.WriteRange(objExcelWorkBook,"Sheet1","D1",airline_start)
Excel.WriteRange(objExcelWorkBook,"Sheet1","E1",airline_end)
Excel.WriteRange(objExcelWorkBook,"Sheet1","F1",airline_price)
Excel.InsertRow(objExcelWorkBook,"Sheet1","A1",["序号","航空公司","航班号","出发时间","到达时间","价格"])
Rem 写入序号
For i=0 To Len(airline_names)-1
	i = i+1
	Excel.WriteCell(objExcelWorkBook,"Sheet1","A"&i+1,i,False)
Next
Rem 用户可能会多次输入，这里可以循环操作，避免重复抓取
Do While True

	sRet = Dialog.InputBox("请选择航班序号","UiBot","",False)
	Rem 用户输入的值都是字符串，需要转换为整数
	sRet = CInt(sRet)
	If sRet > Len(airline_names)
		iRet = Dialog.MsgBox("输入的长度大于航班总数","UiBot","0","1",0)
		Continue
	End If
	TracePrint airline_names[sRet]
	iRet = Dialog.MsgBox(airline_names[sRet][0]&airline_planes[sRet][0]&airline_start[sRet][0]&"到"&airline_end[sRet][0]&airline_price[sRet][0],"UiBot","0","1",0)
Loop
```
