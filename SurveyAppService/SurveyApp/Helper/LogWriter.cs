using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;

namespace SurveyApp
{
    public static class LogWriter
    {
        
        public static void LogWrite(string logMessage)
        {
            var path = HttpContext.Current.Server.MapPath("log.text");
            try
            {
                using (StreamWriter txtWriter = File.AppendText(path))
                {                    
                    txtWriter.Write("\r\nLog Entry : ");
                    txtWriter.WriteLine("{0} {1}", DateTime.Now.ToLongTimeString(),
                        DateTime.Now.ToLongDateString());
                    txtWriter.WriteLine("  :");
                    txtWriter.WriteLine("  :{0}", logMessage);
                    txtWriter.WriteLine("-------------------------------");
                }
            }
            catch (Exception ex)
            {
            }
        }
        
    }
}